const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('serves the XML sitemap with current PQI product pages', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-sitemap-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-sitemap-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/sitemap.xml`
    );

    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(
      response.headers.get('content-type'),
      /^application\/xml/
    );
    assert.ok(body.includes('<?xml'));
    assert.ok(body.includes('/products/pqi380Plus'));
    assert.ok(body.includes('/products/pqi380go'));
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
