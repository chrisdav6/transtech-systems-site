const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flashMessages = require('../utils/flashMessages');

test('persists flash messages across requests and clears them after reading', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-session-test-')
  );

  const app = express();

  const store = new FileStore({
    path: directory,
    ttl: 60,
    retries: 0,
    reapInterval: -1,
    logFn: () => {},
  });

  app.use(session({
    store,
    secret: 'temporary-test-secret-not-for-production',
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
  }));

  app.use(flashMessages());

  app.get('/set', (req, res) => {
    req.flash('success', 'Session persistence works');

    req.session.save((error) => {
      if (error) {
        return res.status(500).send('Session save failed');
      }

      res.redirect('/read');
    });
  });

  app.get('/read', (req, res) => {
    res.json({
      messages: req.flash('success'),
    });
  });

  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const first = await fetch(`${baseUrl}/set`, {
      redirect: 'manual',
    });

    assert.equal(first.status, 302);

    const cookie = first.headers.get('set-cookie');
    assert.ok(cookie, 'Expected a session cookie');

    const sessionCookie = cookie.split(';')[0];

    const second = await fetch(`${baseUrl}/read`, {
      headers: { Cookie: sessionCookie },
    });

    assert.equal(second.status, 200);
    assert.deepEqual(await second.json(), {
      messages: ['Session persistence works'],
    });

    const third = await fetch(`${baseUrl}/read`, {
      headers: { Cookie: sessionCookie },
    });

    assert.equal(third.status, 200);
    assert.deepEqual(await third.json(), {
      messages: [],
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      store.clear((error) => {
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
