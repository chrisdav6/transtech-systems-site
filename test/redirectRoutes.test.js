const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const cases = [
  {
    route: '/products/index.php',
    status: 301,
    location: '/products',
  },
  {
    route: '/products/pqi380.php',
    status: 301,
    location: '/products/pqi380',
  },
  {
    route: '/europe',
    status: 302,
    location: 'https://www.mit-dresden.de',
  },
  {
    route: '/this-page-does-not-exist-test',
    status: 404,
    location: null,
  },
];

test('handles legacy redirects and unknown routes', async (t) => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-redirect-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-redirect-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const port = server.address().port;

    for (const item of cases) {
      await t.test(`GET ${item.route}`, async () => {
        const response = await fetch(
          `http://127.0.0.1:${port}${item.route}`,
          {
            redirect: 'manual',
            headers: {
              'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
            },
          }
        );

        assert.equal(response.status, item.status);
        assert.equal(
          response.headers.get('location'),
          item.location
        );

        if (item.status === 404) {
          const html = await response.text();

          assert.match(
            response.headers.get('content-type'),
            /^text\/html/
          );
          assert.ok(html.includes('<html'));
          assert.ok(html.includes('Oops!'));
        } else {
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
