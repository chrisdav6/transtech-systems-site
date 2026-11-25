
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Product Registration validates fields and reCAPTCHA before sending emails', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-registration-validation-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-registration-validation-secret';
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
      return { messageId: 'mock-registration-validation-message' };
    },
  });

  const captchaCalls = [];

  mockModule(captchaPath, async (token) => {
    captchaCalls.push(token);
    return token === 'valid-test-captcha';
  });

  // Bypass throttling only in this test process.
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
    const url = `http://127.0.0.1:${port}/products/productRegistration`;

    const validData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      registerProduct: 'PQI 380 Plus',
      date: '2026-11-23',
      serial: 'TEST-REG-123',
      'g-recaptcha-response': 'valid-test-captcha',
    });

    const invalidCases = [
      { field: 'name', value: '' },
      { field: 'name', value: '   ' },
      { field: 'company', value: '' },
      { field: 'phone', value: '' },
      { field: 'email', value: '' },
      { field: 'email', value: 'not-an-email' },
      { field: 'serial', value: '' },
      { field: 'date', value: '' },
      { field: 'date', value: 'not-a-date' },
      { field: 'date', value: '2026-02-30' },
      { field: 'date', value: '2026-13-01' },
      { field: 'registerProduct', value: '' },
      { field: 'registerProduct', value: 'Unknown Product' },
      { field: 'registerProduct', value: '<b>PQI 380 Plus</b>' },
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

      assert.equal(response.status, 302, `Invalid ${field}: ${value}`);
      assert.equal(
        response.headers.get('location'),
        '/products/productRegistration'
      );
      assert.equal(
        sentEmails.length,
        0,
        `Invalid ${field} (${value}) must not generate emails`
      );
    }

        // Invalid fields must be rejected before CAPTCHA verification.
    assert.equal(captchaCalls.length, 0);

    // Reject missing, empty, whitespace-only, and invalid CAPTCHA tokens.
    const invalidCaptchaTokens = [
      null,
      '',
      '   ',
      'invalid-test-captcha',
    ];

    for (const token of invalidCaptchaTokens) {
      const data = new URLSearchParams(validData);

      if (token === null) {
        data.delete('g-recaptcha-response');
      } else {
        data.set('g-recaptcha-response', token);
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
      assert.equal(
        response.headers.get('location'),
        '/products/productRegistration'
      );
      assert.equal(sentEmails.length, 0);
    }

    assert.deepEqual(captchaCalls, ['invalid-test-captcha']);

    // A valid submission with a verified CAPTCHA must generate an email.
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
      },
      body: new URLSearchParams(validData),
    });

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/productRegistration'
    );
    assert.deepEqual(captchaCalls, [
      'invalid-test-captcha',
      'valid-test-captcha',
    ]);
    assert.equal(sentEmails.length, 1);
    assert.equal(sentEmails[0].replyTo, 'test@example.com');
    assert.match(sentEmails[0].html, /TEST-REG-123/);
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
