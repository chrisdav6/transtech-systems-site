const test = require('node:test');
const assert = require('node:assert/strict');

const sanitizeFormField = require('../utils/sanitizeFormField');

function createRequest() {
  return {
    sanitize(value) {
      return String(value).replace(/<[^>]*>/g, '');
    },
  };
}

test('preserves normal text', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, 'Test User'),
    'Test User'
  );
});

test('removes HTML tags', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, '<b>Test User</b>'),
    'Test User'
  );
});

test('handles undefined values', () => {
  const req = createRequest();

  assert.equal(sanitizeFormField(req, undefined), '');
});

test('handles null values', () => {
  const req = createRequest();

  assert.equal(sanitizeFormField(req, null), '');
});

test('handles empty strings', () => {
  const req = createRequest();

  assert.equal(sanitizeFormField(req, ''), '');
});
