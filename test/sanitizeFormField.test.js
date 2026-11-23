const test = require('node:test');
const assert = require('node:assert/strict');
const sanitizer = require('sanitizer');

const sanitizeFormField = require('../utils/sanitizeFormField');

function createRequest() {
  return {
    sanitize(value) {
      return sanitizer.sanitize(value);
    },
  };
}

test('preserves normal text', () => {
  const req = createRequest();

  assert.equal(sanitizeFormField(req, 'Test User'), 'Test User');
});

test('removes HTML tags', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, '<b>Test User</b>'),
    'Test User'
  );
});

test('preserves ampersands without double encoding', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, 'Smith & Sons'),
    'Smith & Sons'
  );
});

test('preserves less-than comparisons', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, '5 < 10'),
    '5 < 10'
  );
});

test('preserves apostrophes', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, "Tom's Company"),
    "Tom's Company"
  );
});

test('removes HTML markup while preserving its text', () => {
  const req = createRequest();

  assert.equal(
    sanitizeFormField(req, '<b>Smith & Sons</b>'),
    'Smith & Sons'
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
