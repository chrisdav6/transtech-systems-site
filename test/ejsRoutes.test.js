const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const pages = [
  { route: '/', expected: 'TransTech Systems' },
  { route: '/products', expected: 'TransTech Systems' },
  {
    route: '/products/pqi380',
    expected: 'Discontinued',
    manuals: [
      'PQI 380 Manual',
      'PQI 380 QuickStart Guide',
      'PQI 380 Offset Cheat Sheet',
    ],
  },
  {
    route: '/products/pqi380Plus',
    expected: 'PQI 380+',
    manuals: [
      'PQI 380 Plus Manual',
      'PQI 380 Plus QuickStart Guide',
      'PQI 380 Plus Offset Cheat Sheet',
    ],
  },
  {
    route: '/products/pqi380go',
    expected: 'PQI 380go',
    manuals: [
      'PQI 380go Manual',
      'PQI 380go QuickStart Guide',
      'PQI 380go Offset Cheat Sheet',
    ],
  },
  {
    route: '/products/sdg200',
    manuals: [
      'SDG 200 Manual',
      'SDG 200 QuickStart Guide',
      'SDG 200 StartUp Cheat Sheet',
    ],
  },
  {
    route: '/products/nwjm',
    manuals: ['NWJM Manual', 'NWJM Thin Lift Manual'],
  },
  {
    route: '/products/swm',
    manuals: ['SWM Manual'],
  },
  {
    route: '/products/pts3000',
    manuals: ['PTS 3000 Manual'],
  },
  {
    route: '/products/pqi301',
    manuals: ['PQI 301 Manual', 'PQI 301 Offset Cheat Sheet'],
  },
];

test('renders homepage, product pages, and centralized manual forms', async (t) => {
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
        assert.match(response.headers.get('content-type'), /^text\/html/);
        assert.ok(html.includes('<html'));

        if (page.expected) {
          assert.ok(
            html.includes(page.expected),
            `Expected page content: ${page.expected}`
          );
        }

        if (page.manuals) {
          assert.ok(html.includes('id="manualDownload"'));
          assert.ok(html.includes('id="manualForm"'));

          assert.ok(
            html.includes('action="/products/productManuals"'),
            'Manual form should use the centralized endpoint'
          );

          for (const manualName of page.manuals) {
            assert.ok(
              html.includes(`data-id="${manualName}"`),
              `Missing manual button: ${manualName}`
            );
          }
        }
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
