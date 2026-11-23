
const test = require('node:test');
const assert = require('node:assert/strict');

const validateFieldLengths = require('../utils/validateFieldLengths');

test('accepts fields within their maximum lengths', () => {
  const fields = {
    name: 'John Smith',
    email: 'john@example.com',
    message: 'Please contact me.',
  };

  const limits = {
    name: 100,
    email: 254,
    message: 5000,
  };

  assert.equal(validateFieldLengths(fields, limits), true);
});

test('accepts fields exactly at their maximum lengths', () => {
  assert.equal(
    validateFieldLengths({ name: 'A'.repeat(100) }, { name: 100 }),
    true
  );
});

test('rejects fields exceeding their maximum lengths', () => {
  assert.equal(
    validateFieldLengths({ name: 'A'.repeat(101) }, { name: 100 }),
    false
  );
});

test('allows optional fields to be empty or omitted', () => {
  const fields = {
    name: 'John Smith',
    message: '',
  };

  const limits = {
    name: 100,
    message: 5000,
    company: 150,
  };

  assert.equal(validateFieldLengths(fields, limits), true);
});

test('rejects unexpected field data types', () => {
  assert.equal(
    validateFieldLengths({ name: ['John', 'Smith'] }, { name: 100 }),
    false
  );

  assert.equal(
    validateFieldLengths({ name: { first: 'John' } }, { name: 100 }),
    false
  );
});

test('validates multiple fields independently', () => {
  const fields = {
    name: 'John Smith',
    company: 'A'.repeat(151),
    message: 'Hello',
  };

  const limits = {
    name: 100,
    company: 150,
    message: 5000,
  };

  assert.equal(validateFieldLengths(fields, limits), false);
});
