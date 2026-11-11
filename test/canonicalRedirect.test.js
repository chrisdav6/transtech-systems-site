const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const cases = [
  {
    path: '/',
    host: 'www.transtechsys.com',
    status: 301,
    location: 'https://transtechsys.com/',
  },
  {
    path: '/products/pqi380Plus?source=google',
    host: 'www.transtechsys.com',
    status: 301,
    location:
      'https://transtechsys.com/products/pqi380Plus?source=google',
  },
  {
    path: '/products/pqi380go',
    host: 'transtechsys.com',
    status: 200,
    location: null,
  },
];

test('handles canonical domain redirects', async (t) => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-canonical-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-canonical-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });

    for (const item of cases) {
      await t.test(
        `GET ${item.host}${item.path}`,
        async () => {
          const result = await new Promise((resolve, reject) => {
            http.get({
              hostname: '127.0.0.1',
              port: server.address().port,
              path: item.path,
              headers: {
                Host: item.host,
                'User-Agent':
                  'Mozilla/5.0 Chrome/120.0.0.0',
              },
            }, (res) => {
              const response = {
                status: res.statusCode,
                location: res.headers.location || null,
              };

              res.resume();
              res.on('end', () => resolve(response));
              res.on('error', reject);
            }).on('error', reject);
          });

          assert.equal(result.status, item.status);
          assert.equal(result.location, item.location);
        }
      );
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
