const test = require('node:test');
const assert = require('node:assert/strict');
const { mock } = require('node:test');

const verifyRecaptcha = require('../utils/verifyRecaptcha');

test('rejects missing secret key', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;

  try {
    delete process.env.RECAPTCHA_SECRET_KEY;

    assert.equal(await verifyRecaptcha('valid-token'), false);
  } finally {
    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});

test('rejects missing or invalid tokens', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;

  try {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';

    assert.equal(await verifyRecaptcha(''), false);
    assert.equal(await verifyRecaptcha(null), false);
    assert.equal(await verifyRecaptcha(12345), false);
  } finally {
    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});

test('accepts successful Google verification', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;
  const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(
      url,
      'https://www.google.com/recaptcha/api/siteverify'
    );
    assert.equal(options.method, 'POST');

    const params = new URLSearchParams(options.body);

    assert.equal(params.get('secret'), 'test-secret');
    assert.equal(params.get('response'), 'valid-token');
    assert.equal(params.get('remoteip'), '192.0.2.1');

    return {
      ok: true,
      json: async () => ({ success: true }),
    };
  });

  try {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';

    assert.equal(
      await verifyRecaptcha('valid-token', '192.0.2.1'),
      true
    );
    assert.equal(fetchMock.mock.callCount(), 1);
  } finally {
    fetchMock.mock.restore();

    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});

test('rejects unsuccessful Google verification', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;
  const fetchMock = mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    json: async () => ({ success: false }),
  }));

  try {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';

    assert.equal(await verifyRecaptcha('invalid-token'), false);
  } finally {
    fetchMock.mock.restore();

    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});

test('rejects HTTP errors from Google', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;
  const fetchMock = mock.method(globalThis, 'fetch', async () => ({
    ok: false,
    status: 500,
  }));

  try {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';

    assert.equal(await verifyRecaptcha('test-token'), false);
  } finally {
    fetchMock.mock.restore();

    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});

test('rejects network failures safely', async () => {
  const originalSecret = process.env.RECAPTCHA_SECRET_KEY;
  const fetchMock = mock.method(globalThis, 'fetch', async () => {
    throw new Error('Simulated network failure');
  });

  const errorMock = mock.method(console, 'error', () => {});

  try {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';

    assert.equal(await verifyRecaptcha('test-token'), false);
    assert.equal(errorMock.mock.callCount(), 1);
  } finally {
    fetchMock.mock.restore();
    errorMock.mock.restore();

    if (originalSecret === undefined) {
      delete process.env.RECAPTCHA_SECRET_KEY;
    } else {
      process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    }
  }
});
