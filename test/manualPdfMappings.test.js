const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const manualNames = require('../utils/manualNames');

const formsHandlingPath = path.join(
  __dirname,
  '../public/js/formsHandling.js'
);

const pdfDirectory = path.join(__dirname, '../public/pdf');
const source = fs.readFileSync(formsHandlingPath, 'utf8');

test('every approved manual has a PDF mapping and an existing file', () => {
  const mappingPattern =
    /case\s+['"]([^'"]+)['"]\s*:\s*[\s\S]*?\.attr\(\s*['"]href['"]\s*,\s*['"](\/pdf\/[^'"]+\.pdf)['"]\s*,?\s*\)/g;

  const mappings = new Map();

  for (const match of source.matchAll(mappingPattern)) {
    const [, manualName, pdfUrl] = match;

    assert.equal(
      mappings.has(manualName),
      false,
      `Duplicate PDF mapping: ${manualName}`
    );

    mappings.set(manualName, pdfUrl);
  }

  for (const manualName of manualNames) {
    assert.ok(
      mappings.has(manualName),
      `Missing PDF mapping for: ${manualName}`
    );

    const pdfUrl = mappings.get(manualName);
    const filename = path.basename(pdfUrl);
    const filePath = path.join(pdfDirectory, filename);

    assert.ok(
      fs.existsSync(filePath),
      `Missing PDF file: ${filePath}`
    );
  }

  for (const manualName of mappings.keys()) {
    assert.ok(
      manualNames.has(manualName),
      `PDF mapping is not registered: ${manualName}`
    );
  }

  assert.equal(
    mappings.size,
    manualNames.size,
    'The number of PDF mappings must match the approved manual count'
  );
});
