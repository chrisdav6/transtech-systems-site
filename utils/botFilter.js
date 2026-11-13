const blockedBots = [
  'ahrefsbot',
  'semrushbot',
  'mj12bot',
  'dotbot',
  'megaindex',
  'blexbot',
  'python-urllib',
  'curl/',
  'wget/',
  'httrack',
  'phpcrawl',
  'masscan',
  'zgrab',
];

function botFilter(req, res, next) {
  const userAgent = (req.get('User-Agent') || '').toLowerCase();

  if (blockedBots.some((bot) => userAgent.includes(bot))) {
    return res.status(403).send('Forbidden');
  }

  next();
}

module.exports = botFilter;
