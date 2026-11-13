const { rateLimit } = require('express-rate-limit');

const formRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many form submissions. Please try again in 15 minutes.',
});

module.exports = formRateLimiter;
