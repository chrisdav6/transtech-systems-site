const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const directory = fs.mkdtempSync(
  path.join(os.tmpdir(), 'transtech-static-assets-test-')
);

process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'temporary-static-assets-secret';
process.env.SESSION_STORE_PATH = directory;

const app = require('../app');

test('serves static assets with correct caching headers', async (t) => {
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    const assets = [
      {
        url: '/css/bootstrap.css',
        contentType: 'text/css',
      },
      {
        url: '/js/scripts.js',
        contentType: 'application/javascript',
      },
      {
        url: '/img/404graphic.png',
        contentType: 'image/png',
      },
    ];

    for (const asset of assets) {
      await t.test(`GET ${asset.url}`, async () => {
        const response = await fetch(baseUrl + asset.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          },
        });

        try {
          assert.equal(response.status, 200);

          assert.ok(
            response.headers
              .get('content-type')
              ?.startsWith(asset.contentType),
            `Incorrect Content-Type for ${asset.url}`
          );

          assert.equal(
            response.headers.get('cache-control'),
            'public, max-age=604800'
          );

          assert.ok(
            response.headers.get('etag'),
            `Missing ETag for ${asset.url}`
          );
        } finally {
          await response.body?.cancel();
        }
      });
    }
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
