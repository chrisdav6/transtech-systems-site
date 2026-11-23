const sanitizer = require('sanitizer');

function sanitizeFormField(req, value) {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const sanitized = req.sanitize(String(value));

  const withoutTags = (sanitized || '').replace(/<\/?[^>]+(>|$)/g, '');

  return sanitizer.unescapeEntities(withoutTags);
}

module.exports = sanitizeFormField;
