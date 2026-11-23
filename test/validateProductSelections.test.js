const test = require('node:test');
const assert = require('node:assert/strict');
const validateProductSelections = require('../utils/validateProductSelections');

const approvedProducts = [
  'PQI 380 Plus',
  'PQI 380go',
  'PQI 380',
  'SDG 200',
  'SWM',
  'NWJM',
  'PTS 3000',
  'Part Request',
  'TradeIn Info',
  'TransTech Connect',
];

test('accepts optional selections that are empty or missing', () => {
  assert.equal(validateProductSelections(undefined), true);
  assert.equal(validateProductSelections(null), true);
  assert.equal(validateProductSelections(''), true);
});

test('accepts every approved product individually', () => {
  for (const product of approvedProducts) {
    assert.equal(validateProductSelections(product), true);
  }
});

test('accepts multiple approved product selections', () => {
  assert.equal(
    validateProductSelections(['PQI 380 Plus', 'PQI 380go']),
    true
  );
});

test('accepts all ten approved products', () => {
  assert.equal(validateProductSelections(approvedProducts), true);
});

test('rejects unknown or modified product values', () => {
  assert.equal(validateProductSelections('Unknown Product'), false);
  assert.equal(validateProductSelections('PQI 380 Plus '), false);
  assert.equal(validateProductSelections('<script>alert(1)</script>'), false);
});

test('rejects duplicate product selections', () => {
  assert.equal(
    validateProductSelections(['PQI 380go', 'PQI 380go']),
    false
  );
});

test('rejects unexpected data types and nested arrays', () => {
  assert.equal(validateProductSelections(123), false);
  assert.equal(validateProductSelections({ product: 'PQI 380go' }), false);
  assert.equal(validateProductSelections([['PQI 380go']]), false);
});

test('rejects more than ten selections', () => {
  assert.equal(
    validateProductSelections([...approvedProducts, 'PQI 380go']),
    false
  );
});
