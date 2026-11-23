
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Request Integration rejects invalid submissions without sending emails', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-integration-validation-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-integration-validation-secret';
  process.env.SESSION_STORE_PATH = directory;

  const transporterPath = require.resolve('../utils/mailTransporter');
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
      return { messageId: 'mock-integration-message' };
    },
  });

  // The real rate limiter is tested separately.
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
    const url = `http://127.0.0.1:${port}/products/requestIntegration`;

    const validData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      state: 'NY',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet Search',
      message: 'Integration validation test message',
    });

    const invalidCases = [
      { field: 'name', value: '' },
      { field: 'company', value: '   ' },
      { field: 'phone', value: '' },
      { field: 'email', value: 'not-an-email' },
      { field: 'reach', value: '' },
      { field: 'message', value: '   ' },
      { field: 'country', value: 'Invalid Country' },
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
        '/products/requestIntegration'
      );
      assert.equal(
        sentEmails.length,
        0,
        `Invalid ${field} must not generate an email`
      );
    }

    // International submissions require distributor-sharing consent.
    const internationalData = new URLSearchParams(validData);
    internationalData.set('country', 'Canada');

    const response = await fetch(url, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
      },
      body: internationalData,
    });

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/requestIntegration'
    );
    assert.equal(
      sentEmails.length,
      0,
      'Missing international consent must not generate an email'
    );
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
