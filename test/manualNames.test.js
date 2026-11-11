const test = require('node:test');
const assert = require('node:assert/strict');

const manualNames = require('../utils/manualNames');

test('contains exactly 18 approved manual names', () => {
  assert.equal(manualNames.size, 18);
});

test('accepts all approved manual names', () => {
  for (const name of manualNames) {
    assert.equal(manualNames.has(name), true);
  }
});

test('rejects unknown manual names', () => {
  assert.equal(manualNames.has('Unknown Manual'), false);
  assert.equal(manualNames.has('PQI 380 Plus'), false);
  assert.equal(manualNames.has(''), false);
});

test('rejects case variations and whitespace changes', () => {
  assert.equal(manualNames.has('pqi 380 Plus Manual'), false);
  assert.equal(manualNames.has(' PQI 380 Plus Manual'), false);
  assert.equal(manualNames.has('PQI 380 Plus Manual '), false);
});
