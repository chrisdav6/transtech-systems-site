
const fs = require('node:fs');

const file = 'views/homePage/index.ejs';
const original = fs.readFileSync(file, 'utf8');

let updated = 0;

// Match history images while preserving existing attributes.
// Skip images already wrapped in a <picture> element.
const result = original.replace(
  /(^[ \t]*)(<img\b[^>]*\bsrc=["']\/img\/history\/([^"']+)\.jpg["'][^>]*>)/gm,
  (match, indent, img, filename, offset, fullText) => {
    const before = fullText.slice(0, offset);
    const lastPictureOpen = before.lastIndexOf('<picture');
    const lastPictureClose = before.lastIndexOf('</picture>');

    if (lastPictureOpen > lastPictureClose) {
      return match;
    }

    updated++;

    return [
      `${indent}<picture>`,
      `${indent}  <source srcset="/img/history/${filename}.webp" type="image/webp">`,
      `${indent}  ${img}`,
      `${indent}</picture>`,
    ].join('\n');
  }
);

if (updated === 0) {
  console.log('No images needed updating.');
} else {
  fs.writeFileSync(file, result, 'utf8');
  console.log(`Updated ${updated} history images.`);
}
