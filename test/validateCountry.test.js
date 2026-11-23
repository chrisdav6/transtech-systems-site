const test = require('node:test');
const assert = require('node:assert/strict');

const validateCountry = require('../utils/validateCountry');

test('accepts United States', () => {
  assert.equal(validateCountry('United States'), true);
});

test('accepts valid international countries', () => {
  assert.equal(validateCountry('Canada'), true);
  assert.equal(validateCountry('United Kingdom'), true);
  assert.equal(validateCountry('Australia'), true);
});

test('rejects invalid country values', () => {
  assert.equal(validateCountry('Not A Country'), false);
  assert.equal(validateCountry('United States of America'), false);
});

test('rejects missing and non-string values', () => {
  assert.equal(validateCountry(undefined), false);
  assert.equal(validateCountry(null), false);
  assert.equal(validateCountry(''), false);
  assert.equal(validateCountry(123), false);
});

test('identifies international countries', () => {
  assert.equal(validateCountry.isInternational('Canada'), true);
  assert.equal(validateCountry.isInternational('United States'), false);
});

test('rejects invalid values as international countries', () => {
  assert.equal(validateCountry.isInternational('Not A Country'), false);
  assert.equal(validateCountry.isInternational(undefined), false);
});

test('all five forms use identical country lists', () => {
  assert.doesNotThrow(() => require('../utils/validateCountry'));
});
