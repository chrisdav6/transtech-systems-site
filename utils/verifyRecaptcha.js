async function verifyRecaptcha(token, remoteIp) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret || !token || typeof token !== 'string') {
    return false;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    params.set('remoteip', remoteIp);
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error.message);
    return false;
  }
}

module.exports = verifyRecaptcha;
