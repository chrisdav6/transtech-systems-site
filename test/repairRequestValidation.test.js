
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Repair Request rejects invalid submissions without sending emails', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-repair-validation-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-repair-validation-secret';
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
      return { messageId: 'mock-repair-validation-message' };
    },
  });

  mockModule(captchaPath, async () => true);

  // Disable throttling only for this test process.
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
    const url = `http://127.0.0.1:${port}/products/repairRequest`;

    const validData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      address: '123 Test Street',
      city: 'Albany',
      state: 'New York',
      zip: '12207',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      repairProduct: 'PQI 380 Plus',
      repairSerial: 'TEST-12345',
      repairQty: '1',
      estimate: 'Over $1000',
      serviceMessage: 'Automated repair validation test',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const invalidCases = [
      { field: 'name', value: '' },
      { field: 'company', value: '   ' },
      { field: 'address', value: '' },
      { field: 'city', value: '   ' },
      { field: 'phone', value: '' },
      { field: 'email', value: 'not-an-email' },
      { field: 'repairSerial', value: '' },
      { field: 'serviceMessage', value: '   ' },
      { field: 'repairQty', value: '0' },
      { field: 'repairQty', value: '-1' },
      { field: 'repairQty', value: '1.5' },
      { field: 'repairQty', value: 'abc' },
      { field: 'repairProduct', value: 'Unknown Product' },
      { field: 'repairProduct', value: '' },
      { field: 'estimate', value: 'Yes' },
      { field: 'estimate', value: '' },
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
        '/products/repairRequest'
      );
      assert.equal(
        sentEmails.length,
        0,
        `Invalid ${field} (${value}) must not generate emails`
      );
    }
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
