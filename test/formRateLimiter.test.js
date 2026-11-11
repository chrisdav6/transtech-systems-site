const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const formRateLimiter = require('../utils/formRateLimiter');

test('allows five requests and blocks the sixth', async () => {
  const app = express();

  app.post('/test-form', formRateLimiter, (req, res) => {
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
    const url = `http://127.0.0.1:${address.port}/test-form`;

    for (let i = 1; i <= 5; i++) {
      const response = await fetch(url, {
        method: 'POST',
      });

      assert.equal(response.status, 200, `Request ${i}`);
      assert.equal(await response.text(), 'Accepted');
    }

    const blockedResponse = await fetch(url, {
      method: 'POST',
    });

    assert.equal(blockedResponse.status, 429);
    assert.equal(
      await blockedResponse.text(),
      'Too many form submissions. Please try again in 15 minutes.'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
