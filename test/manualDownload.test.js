const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const manualNames = require('../utils/manualNames');

test('Product Manual Download endpoint validates requests and handles email delivery', async (t) => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-manual-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-manual-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const nodemailer = require('nodemailer');
  const sentEmails = [];

  let simulateEmailFailure = false;

  const mockTransporter = {
    sendMail: async (mailOptions) => {
      if (simulateEmailFailure) {
        throw new Error('Simulated SMTP failure');
      }

      sentEmails.push(mailOptions);
      return { messageId: 'test-message-id' };
    },
  };

  const originalCreateTransport = nodemailer.createTransport;
  nodemailer.createTransport = () => mockTransporter;

  let server;

  try {
    const app = require('../app');

    nodemailer.createTransport = originalCreateTransport;

    server = app.listen(0, '127.0.0.1');

    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;
    let requestNumber = 0;

    async function submitForm(fields) {
      requestNumber++;

      return fetch(
        `http://127.0.0.1:${port}/products/productManuals`,
        {
          method: 'POST',
          redirect: 'manual',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
            'X-Forwarded-For': `198.51.100.${requestNumber}`,
          },
          body: new URLSearchParams(fields),
        }
      );
    }

    const validForm = {
      name: 'Test User',
      company: 'Test Company',
      country: 'United States',
      email: 'test@example.com',
      currentCustomer: 'Yes',
      reach: 'Internet',
    };

    await t.test('accepts all 18 approved manual names', async (t) => {
      assert.equal(manualNames.size, 18);

      for (const manualName of manualNames) {
        await t.test(manualName, async () => {
          const previousEmailCount = sentEmails.length;

          const response = await submitForm({
            ...validForm,
            manualName,
          });

          assert.equal(response.status, 204);
          assert.equal(sentEmails.length, previousEmailCount + 1);

          assert.match(
            sentEmails.at(-1).html,
            new RegExp(manualName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          );

          assert.equal(
            sentEmails.at(-1).replyTo,
            validForm.email
          );
        });
      }
    });

    await t.test('rejects an unknown manual name', async () => {
      const previousEmailCount = sentEmails.length;

      const response = await submitForm({
        ...validForm,
        manualName: 'Unknown Manual',
      });

      assert.equal(response.status, 400);
      assert.equal(sentEmails.length, previousEmailCount);
    });

    await t.test('rejects missing required fields', async () => {
      const response = await submitForm({
        manualName: 'PQI 380 Plus Manual',
        company: 'Test Company',
        country: 'United States',
        email: 'test@example.com',
      });

      assert.equal(response.status, 400);
    });

    await t.test('rejects invalid email addresses', async () => {
      const response = await submitForm({
        ...validForm,
        manualName: 'PQI 380 Plus Manual',
        email: 'not-an-email',
      });

      assert.equal(response.status, 400);
    });

    await t.test('rejects populated honeypot fields', async () => {
      const response = await submitForm({
        ...validForm,
        manualName: 'PQI 380 Plus Manual',
        businessAddress: 'Spam submission',
      });

      assert.equal(response.status, 400);
    });

    await t.test('handles email delivery failures', async () => {
      simulateEmailFailure = true;

      const response = await submitForm({
        ...validForm,
        manualName: 'PQI 380 Plus Manual',
      });

      assert.equal(response.status, 500);

      simulateEmailFailure = false;
    });
  } finally {
    nodemailer.createTransport = originalCreateTransport;

    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});
