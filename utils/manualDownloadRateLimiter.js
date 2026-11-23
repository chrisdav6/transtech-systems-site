const { rateLimit } = require('express-rate-limit');

const manualDownloadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many manual download requests. Please try again in 15 minutes.',
});

module.exports = manualDownloadRateLimiter;
