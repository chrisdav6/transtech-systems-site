
function validateFieldLengths(fields, limits) {
  for (const [field, maxLength] of Object.entries(limits)) {
    const value = fields[field];

    // Optional fields may be empty or omitted.
    if (value === undefined || value === null || value === '') {
      continue;
    }

    // Reject unexpected data types.
    if (typeof value !== 'string') {
      return false;
    }

    // Reject values exceeding the permitted length.
    if (value.length > maxLength) {
      return false;
    }
  }

  return true;
}

module.exports = validateFieldLengths;
