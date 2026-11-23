const allowedSelections = new Set([
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
]);

function validateProductSelections(value) {
  if (value === undefined || value === null || value === '') {
    return true;
  }

  const selections = Array.isArray(value) ? value : [value];

  if (selections.length > allowedSelections.size) {
    return false;
  }

  if (selections.some((selection) =>
    typeof selection !== 'string' ||
    !allowedSelections.has(selection)
  )) {
    return false;
  }

  return new Set(selections).size === selections.length;
}

module.exports = validateProductSelections;
