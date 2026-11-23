const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const manualDownloadRateLimiter = require('../utils/manualDownloadRateLimiter');

test('manual downloads allow fifteen requests and block the sixteenth', async () => {
  const app = express();

  app.post('/test-manual', manualDownloadRateLimiter, (req, res) => {
    res.status(200).send('Accepted');
  });

  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const address = server.address();
    const url = `http://127.0.0.1:${address.port}/test-manual`;

    for (let i = 1; i <= 15; i++) {
      const response = await fetch(url, { method: 'POST' });
      assert.equal(response.status, 200, `Request ${i}`);
    }

    const blockedResponse = await fetch(url, { method: 'POST' });

    assert.equal(blockedResponse.status, 429);
    assert.equal(
      await blockedResponse.text(),
      'Too many manual download requests. Please try again in 15 minutes.'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('manual downloads do not consume the standard form allowance', async () => {
  // Test the actual rate limiters used by the website.
  const manualLimiter = require('../utils/manualDownloadRateLimiter');
  const standardLimiter = require('../utils/formRateLimiter');

  const app = express();
  app.set('trust proxy', 'loopback');
  const testCustomerIp = '198.51.100.30';

  app.post('/test-manual', manualLimiter, (req, res) => {
    res.sendStatus(200);
  });

  app.post('/test-form', standardLimiter, (req, res) => {
    res.sendStatus(200);
  });

  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    // Download 15 manuals from the same IP.
    for (let i = 1; i <= 15; i++) {
      const response = await fetch(`${baseUrl}/test-manual`, {
        method: 'POST',
        headers: { 'X-Forwarded-For': testCustomerIp },
      });
      assert.equal(response.status, 200, `Manual request ${i}`);
    }

    // All five standard form submissions should still be allowed.
    for (let i = 1; i <= 5; i++) {
      const response = await fetch(`${baseUrl}/test-form`, {
        method: 'POST',
        headers: { 'X-Forwarded-For': testCustomerIp },
      });
      assert.equal(response.status, 200, `Standard form request ${i}`);
    }

    // The sixth standard form submission should be blocked.
    const blockedResponse = await fetch(`${baseUrl}/test-form`, {
      method: 'POST',
      headers: { 'X-Forwarded-For': testCustomerIp },
    });

    assert.equal(blockedResponse.status, 429);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
