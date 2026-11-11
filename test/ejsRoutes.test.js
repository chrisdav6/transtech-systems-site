const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const pages = [
  {
    route: '/',
    expected: 'TransTech Systems',
  },
  {
    route: '/products',
    expected: 'TransTech Systems',
  },
  {
    route: '/products/pqi380',
    expected: 'Discontinued',
  },
  {
    route: '/products/pqi380Plus',
    expected: 'PQI 380+',
  },
  {
    route: '/products/pqi380go',
    expected: 'PQI 380go',
  },
];

test('renders the homepage and PQI product pages', async (t) => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-ejs-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-ejs-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    for (const page of pages) {
      await t.test(`GET ${page.route}`, async () => {
        const response = await fetch(
          `http://127.0.0.1:${port}${page.route}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
            },
          }
        );

        const html = await response.text();

        assert.equal(response.status, 200);
        assert.match(
          response.headers.get('content-type'),
          /^text\/html/
        );
        assert.ok(html.includes('<html'));
        assert.ok(html.includes(page.expected));
      });
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});
