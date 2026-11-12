'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const sessionDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), 'transtech-legacy-manual-test-')
);

process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.SESSION_STORE_PATH = sessionDirectory;

const app = require('../app');

const obsoleteRoutes = [
  '/products/pqi380',
  '/products/sdg200',
  '/products/nwjm',
  '/products/swm',
  '/products/pts3000',
  '/products/pqi301'
];

test('obsolete manual POST endpoints return 404', async (t) => {
  const server = app.listen(0, '127.0.0.1');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.once('listening', resolve);
  });

  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });

    fs.rmSync(sessionDirectory, {
      recursive: true,
      force: true
    });
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  for (const route of obsoleteRoutes) {
    await t.test(`POST ${route}`, async () => {
      const response = await fetch(`${baseUrl}${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0'
        },
        body: new URLSearchParams({
          name: 'Test User',
          company: 'Test Company',
          country: 'United States',
          email: 'test@example.com',
          manualName: 'PQI 380 Manual'
        })
      });

      assert.equal(response.status, 404);
    });
  }
});
