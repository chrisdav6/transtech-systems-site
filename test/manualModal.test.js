const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');

const productsDirectory = path.join(__dirname, '../views/products');

const pages = [
  'nwjm',
  'pqi301',
  'pqi380',
  'pqi380go',
  'pqi380Plus',
  'productManuals',
  'pts3000',
  'sdg200',
  'swm',
];

const partialInclude =
  "<%- include('./partials/manualDownloadModal') %>";

const renderData = {
  canonicalUrl: 'https://transtechsys.com/products/productManuals',
  assetUrl: (url) => url,
  date: new Date().getFullYear(),
};

function countOccurrences(html, value) {
  return html.split(value).length - 1;
}

test('shared manual download partial exists', () => {
  const partialPath = path.join(
    productsDirectory,
    'partials/manualDownloadModal.ejs'
  );

  assert.ok(
    fs.existsSync(partialPath),
    'Shared manual download partial is missing'
  );
});

for (const page of pages) {
  test(`${page} uses one shared manual download modal`, async () => {
    const templatePath = path.join(productsDirectory, `${page}.ejs`);
    const template = fs.readFileSync(templatePath, 'utf8');

    assert.equal(
      countOccurrences(template, partialInclude),
      1,
      `${page} should include the shared partial exactly once`
    );

    assert.equal(
      countOccurrences(template, 'id="manualDownload"'),
      0,
      `${page} should not contain duplicated modal markup`
    );

    const html = await ejs.renderFile(templatePath, renderData);

    for (const id of [
      'manualDownload',
      'manualForm',
      'manualDownloadLink',
    ]) {
      assert.equal(
        countOccurrences(html, `id="${id}"`),
        1,
        `${page} should render exactly one ${id}`
      );
    }

    assert.ok(
      html.includes('action="/products/productManuals"'),
      `${page} should use the centralized manual endpoint`
    );
  });
}
