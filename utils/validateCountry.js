const fs = require('node:fs');
const path = require('node:path');

const formFiles = [
  'salesRequest.ejs',
  'repairRequest.ejs',
  'productRegistration.ejs',
  'requestIntegration.ejs',
  'tradeUp.ejs',
];

function extractCountries(filename) {
  const filePath = path.join(
    __dirname,
    '..',
    'views',
    'products',
    filename
  );

  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(
    /<select[^>]*name="country"[^>]*>([\s\S]*?)<\/select>/
  );

  if (!match) {
    throw new Error(`Country dropdown not found: ${filename}`);
  }

  return [...match[1].matchAll(/<option\s+value="([^"]+)"/g)]
    .map((option) => option[1]);
}

const countryLists = formFiles.map(extractCountries);
const referenceCountries = countryLists[0];

if (referenceCountries.length !== 238) {
  throw new Error(
    `Expected 238 countries, found ${referenceCountries.length}`
  );
}

for (let i = 1; i < countryLists.length; i++) {
  if (
    JSON.stringify(countryLists[i]) !==
    JSON.stringify(referenceCountries)
  ) {
    throw new Error(
      `Country dropdown differs: ${formFiles[i]}`
    );
  }
}

const approvedCountries = new Set(referenceCountries);

function validateCountry(country) {
  return typeof country === 'string' &&
    approvedCountries.has(country);
}

validateCountry.isInternational = (country) =>
  validateCountry(country) && country !== 'United States';

module.exports = validateCountry;
