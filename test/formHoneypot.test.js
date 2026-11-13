const test = require('node:test');
const assert = require('node:assert/strict');

const formHoneypot = require('../utils/formHoneypot');

function runMiddleware(body) {
  const req = { body };
  const result = {
    statusCode: null,
    message: null,
    nextCalled: false,
  };

  const res = {
    status(code) {
      result.statusCode = code;
      return this;
    },
    send(message) {
      result.message = message;
      return this;
    },
  };

  formHoneypot(req, res, () => {
    result.nextCalled = true;
  });

  return result;
}

test('allows an empty honeypot field', () => {
  const result = runMiddleware({ website_url: '' });

  assert.equal(result.nextCalled, true);
  assert.equal(result.statusCode, null);
});

test('rejects a populated honeypot field', () => {
  const result = runMiddleware({
    website_url: 'https://spam.example',
  });

  assert.equal(result.nextCalled, false);
  assert.equal(result.statusCode, 400);
  assert.equal(result.message, 'Invalid form submission.');
});

test('allows submissions without a honeypot field', () => {
  const result = runMiddleware({ name: 'Test User' });

  assert.equal(result.nextCalled, true);
});

test('handles a missing request body', () => {
  const result = runMiddleware(undefined);

  assert.equal(result.nextCalled, true);
});
