function formHoneypot(req, res, next) {
  const value = req.body?.website_url;

  if (value !== undefined && value !== null && value !== '') {
    return res.status(400).send('Invalid form submission.');
  }

  next();
}

module.exports = formHoneypot;
