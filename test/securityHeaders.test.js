const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('serves expected HTTP security headers', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-security-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-security-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const response = await fetch(
      `http://127.0.0.1:${server.address().port}/`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
      }
    );

    assert.equal(response.status, 200);

    assert.equal(
      response.headers.get('strict-transport-security'),
      'max-age=15552000; includeSubDomains'
    );

    assert.equal(
      response.headers.get('x-content-type-options'),
      'nosniff'
    );

    assert.equal(
      response.headers.get('x-frame-options'),
      'SAMEORIGIN'
    );

    assert.equal(
      response.headers.get('x-dns-prefetch-control'),
      'off'
    );

    assert.equal(
      response.headers.get('x-download-options'),
      'noopen'
    );

    await response.body?.cancel();
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});


test('rejects URL-encoded request bodies larger than 100 KB', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-body-limit-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-body-limit-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  let server;

  try {
    const app = require('../app');
    server = app.listen(0, '127.0.0.1');

    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const oversizedBody = new URLSearchParams({
      name: 'Test User',
      company: 'A'.repeat(110 * 1024),
    });

    const response = await fetch(
      `http://127.0.0.1:${server.address().port}/products/requestIntegration`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: oversizedBody,
      }
    );

    assert.equal(response.status, 413);

    await response.body?.cancel();
  } finally {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});
