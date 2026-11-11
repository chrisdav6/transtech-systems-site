const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('serves robots.txt with production SEO directives', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-robots-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-robots-test-secret';
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

    const response = await fetch(
      `http://127.0.0.1:${port}/robots.txt`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
      }
    );

    assert.equal(response.status, 200);

    assert.match(
      response.headers.get('content-type'),
      /^text\/plain/i
    );

    const body = await response.text();

    assert.match(body, /^User-agent:\s*\*$/m);
    assert.match(body, /^Allow:\s*\/$/m);

    assert.ok(
      body.includes(
        'Sitemap: https://transtechsys.com/sitemap.xml'
      )
    );
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
