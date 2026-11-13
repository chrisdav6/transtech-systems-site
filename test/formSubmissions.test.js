const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Sales Request rejects submissions without reCAPTCHA', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-form-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-form-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      name: 'Test User',
      company: 'Test Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet',
      reachInfo: 'Search',
      moreInfo: 'No',
      message: 'Automated form test',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/salesRequest'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});

test('Repair Request rejects submissions without reCAPTCHA', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-repair-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-repair-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      name: 'Test User',
      company: 'Test Company',
      address: '123 Test Street',
      city: 'Albany',
      state: 'New York',
      zip: '12207',
      country: 'United States',
      residential: 'No',
      phone: '5551234567',
      email: 'test@example.com',
      repairProduct: 'PQI 380+',
      repairSerial: 'TEST12345',
      repairQty: '1',
      estimate: 'Yes',
      serviceMessage: 'Automated repair request test',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/repairRequest'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});

test('Sales Request handles missing fields without crashing', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-sales-missing-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-sales-missing-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      company: 'Test Company',
      state: 'New York',
      country: 'United States',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/salesRequest'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});

test('Repair Request handles missing fields without crashing', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-repair-missing-test-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-repair-missing-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const app = require('../app');
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      company: 'Test Company',
      city: 'Albany',
      state: 'New York',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/repairRequest'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));

    fs.rmSync(directory, {
      recursive: true,
      force: true,
    });
  }
});
