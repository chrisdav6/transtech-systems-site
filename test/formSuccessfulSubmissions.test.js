
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Sales and Repair Requests generate expected emails after successful reCAPTCHA', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-sales-success-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-sales-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const transporterPath = require.resolve('../utils/mailTransporter');
  const captchaPath = require.resolve('../utils/verifyRecaptcha');

  const sentEmails = [];

  const originalTransporter = require.cache[transporterPath];
  const originalCaptcha = require.cache[captchaPath];

  require.cache[transporterPath] = {
    id: transporterPath,
    filename: transporterPath,
    loaded: true,
    exports: {
      sendMail: async (options) => {
        sentEmails.push(options);
        return { messageId: 'mock-sales-message' };
      },
    },
  };

  require.cache[captchaPath] = {
    id: captchaPath,
    filename: captchaPath,
    loaded: true,
    exports: async () => true,
  };

  let server;

  try {
    const app = require('../app');
    server = app.listen(0, '127.0.0.1');

    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet',
      reachInfo: 'Search',
      moreInfo: 'No',
      message: 'Automated Sales Request test',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/salesRequest'
    );

    assert.equal(sentEmails.length, 1);
    assert.equal(
      sentEmails[0].subject,
      'TransTech Systems Sales Request Form'
    );
    assert.match(sentEmails[0].html, /Automated Sales Request test/);


    // Verify the Repair Request form using the same mocked services.
    const repairData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test Company',
      address: '123 Test Street',
      city: 'Albany',
      state: 'New York',
      zip: '12207',
      country: 'United States',
      residential: 'No',
      phone: '5551234567',
      email: 'test@example.com',
      repairProduct: 'PQI 380 Plus',
      repairSerial: 'TEST-12345',
      repairQty: '1',
      estimate: 'Yes',
      serviceMessage: 'Automated Repair Request test',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const repairResponse = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: repairData,
      }
    );

    assert.equal(repairResponse.status, 302);
    assert.equal(
      repairResponse.headers.get('location'),
      '/products/repairRequest'
    );

    // One Sales email + two Repair emails.
    assert.equal(sentEmails.length, 3);

    // Internal Repair Request notification.
    assert.equal(
      sentEmails[1].subject,
      'TransTech Systems Repair Request Form'
    );
    assert.match(
      sentEmails[1].html,
      /Automated Repair Request test/
    );
    assert.match(sentEmails[1].html, /TEST-12345/);

    // Customer confirmation.
    assert.equal(
      sentEmails[2].subject,
      'TransTech Systems Calibration/Repair Request Received'
    );
    assert.equal(sentEmails[2].to, 'test@example.com');
    assert.match(sentEmails[2].html, /TEST-12345/);

  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    if (originalTransporter) {
      require.cache[transporterPath] = originalTransporter;
    } else {
      delete require.cache[transporterPath];
    }

    if (originalCaptcha) {
      require.cache[captchaPath] = originalCaptcha;
    } else {
      delete require.cache[captchaPath];
    }

    fs.rmSync(directory, { recursive: true, force: true });
  }
});
