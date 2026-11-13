'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const escapeHtml = require('../utils/escapeHtml');

test('escapes HTML special characters', () => {
  assert.equal(
    escapeHtml(`&<>"'`),
    '&amp;&lt;&gt;&quot;&#39;'
  );
});

test('preserves ordinary text', () => {
  assert.equal(
    escapeHtml('TransTech Systems'),
    'TransTech Systems'
  );
});

test('preserves company names with ampersands', () => {
  assert.equal(
    escapeHtml('Smith & Sons'),
    'Smith &amp; Sons'
  );
});

test('prevents HTML tags from being interpreted as markup', () => {
  assert.equal(
    escapeHtml('<script>alert("test")</script>'),
    '&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;'
  );
});

test('handles null and undefined values', () => {
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
});

test('handles numeric values', () => {
  assert.equal(escapeHtml(12345), '12345');
});
