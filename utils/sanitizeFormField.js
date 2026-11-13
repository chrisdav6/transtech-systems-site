function sanitizeFormField(req, value) {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const sanitized = req.sanitize(String(value));

  return (sanitized || '').replace(/<\/?[^>]+(>|$)/g, '');
}

module.exports = sanitizeFormField;
