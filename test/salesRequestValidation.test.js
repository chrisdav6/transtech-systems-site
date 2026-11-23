
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Sales Request rejects invalid required fields without sending emails', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-sales-validation-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-sales-validation-secret';
  process.env.SESSION_STORE_PATH = directory;

  const transporterPath = require.resolve('../utils/mailTransporter');
  const captchaPath = require.resolve('../utils/verifyRecaptcha');
  const limiterPath = require.resolve('../utils/formRateLimiter');

  const originals = new Map();
  const sentEmails = [];

  function mockModule(modulePath, replacement) {
    originals.set(modulePath, require.cache[modulePath]);
    require.cache[modulePath] = {
      id: modulePath,
      filename: modulePath,
      loaded: true,
      exports: replacement,
    };
  }

  mockModule(transporterPath, {
    sendMail: async (options) => {
      sentEmails.push(options);
      return { messageId: 'mock-validation-message' };
    },
  });

  mockModule(captchaPath, async () => true);

  // Bypass throttling only in this test process.
  // The real limiter is tested separately.
  mockModule(limiterPath, (req, res, next) => next());

  let server;

  try {
    const app = require('../app');
    server = app.listen(0, '127.0.0.1');

    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const port = server.address().port;
    const url = `http://127.0.0.1:${port}/products/salesRequest`;

    const validData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet',
      message: 'Validation test message',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const invalidCases = [
      { field: 'name', value: '' },
      { field: 'company', value: '   ' },
      { field: 'phone', value: '' },
      { field: 'email', value: 'not-an-email' },
      { field: 'reach', value: '' },
      { field: 'message', value: '   ' },
      { field: 'name', value: 'A'.repeat(101) },
      { field: 'company', value: 'B'.repeat(151) },
      { field: 'message', value: 'C'.repeat(5001) },
    ];

    for (const { field, value } of invalidCases) {
      const data = new URLSearchParams(validData);
      data.set(field, value);

      const response = await fetch(url, {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: data,
      });

      assert.equal(response.status, 302, `Invalid ${field}`);
      assert.equal(
        response.headers.get('location'),
        '/products/salesRequest'
      );
      assert.equal(
        sentEmails.length,
        0,
        `Invalid ${field} must not generate an email`
      );
    }

    // Reject invalid or duplicate product selections.
    const invalidProductCases = [
      ['Unknown Product'],
      ['PQI 380go', 'PQI 380go'],
    ];

    for (const products of invalidProductCases) {
      const data = new URLSearchParams(validData);
      for (const product of products) {
        data.append('moreInfo', product);
      }

      const response = await fetch(url, {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: data,
      });

      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), '/products/salesRequest');
      assert.equal(sentEmails.length, 0, 'Invalid products must not generate an email');
    }

    // A name exactly at the maximum permitted length must be accepted.
    const boundaryData = new URLSearchParams(validData);
    boundaryData.set('name', 'A'.repeat(100));

    const boundaryResponse = await fetch(url, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
      },
      body: boundaryData,
    });

    assert.equal(boundaryResponse.status, 302);
    assert.equal(boundaryResponse.headers.get('location'), '/products/salesRequest');
    assert.equal(sentEmails.length, 1, 'A 100-character name should generate an email');
    assert.match(sentEmails[0].html, /A{100}/);
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    for (const [modulePath, original] of originals) {
      if (original) {
        require.cache[modulePath] = original;
      } else {
        delete require.cache[modulePath];
      }
    }

    fs.rmSync(directory, { recursive: true, force: true });
  }
});
