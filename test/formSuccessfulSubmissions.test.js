
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('Sales and Repair Requests generate expected emails after successful reCAPTCHA', async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'transtech-sales-success-')
  );

  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'temporary-sales-test-secret';
  process.env.SESSION_STORE_PATH = directory;

  const transporterPath = require.resolve('../utils/mailTransporter');
  const captchaPath = require.resolve('../utils/verifyRecaptcha');

  const sentEmails = [];

  const originalTransporter = require.cache[transporterPath];
  const originalCaptcha = require.cache[captchaPath];

  require.cache[transporterPath] = {
    id: transporterPath,
    filename: transporterPath,
    loaded: true,
    exports: {
      sendMail: async (options) => {
        sentEmails.push(options);
        return { messageId: 'mock-sales-message' };
      },
    },
  };

  require.cache[captchaPath] = {
    id: captchaPath,
    filename: captchaPath,
    loaded: true,
    exports: async () => true,
  };

  let server;

  try {
    const app = require('../app');
    server = app.listen(0, '127.0.0.1');

    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const port = server.address().port;

    const formData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test & Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet',
      reachInfo: 'Search & <b>Referral</b>',
      moreInfo: 'No',
      message: 'Automated Sales Request & HTML escaping test',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const response = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: formData,
      }
    );

    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      '/products/salesRequest'
    );

    assert.equal(sentEmails.length, 1);
    assert.equal(
      sentEmails[0].subject,
      'TransTech Systems Sales Request Form'
    );
    // Verify customer-submitted values are safely escaped in HTML emails.
    assert.match(sentEmails[0].html, /Test &amp; Company/);
    assert.match(sentEmails[0].html, /Search &amp; Referral/);
    assert.doesNotMatch(sentEmails[0].html, /<b>Referral<\/b>/);
    assert.match(
      sentEmails[0].html,
      /Automated Sales Request &amp; HTML escaping test/
    );

    // Reject Sales Requests with missing required fields or invalid email.
    const invalidSalesCases = [
      { field: 'name', value: '' },
      { field: 'email', value: 'not-an-email' },
    ];

    for (const { field, value } of invalidSalesCases) {
      const invalidData = new URLSearchParams(formData);
      invalidData.set(field, value);

      const invalidResponse = await fetch(
        `http://127.0.0.1:${port}/products/salesRequest`,
        {
          method: 'POST',
          redirect: 'manual',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          },
          body: invalidData,
        }
      );

      assert.equal(invalidResponse.status, 302);
      assert.equal(
        invalidResponse.headers.get('location'),
        '/products/salesRequest'
      );

      // Invalid submissions must never generate an email.
      assert.equal(
        sentEmails.length,
        1,
        `Invalid ${field} submission should not send an email`
      );
    }

    // International Sales Request without privacy consent must be rejected.
    const internationalSalesData = new URLSearchParams(formData);
    internationalSalesData.set('country', 'Canada');
    internationalSalesData.set('state', 'Not Available');
    internationalSalesData.delete('confirmPrivacy');

    const internationalSalesResponse = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: internationalSalesData,
      }
    );

    assert.equal(internationalSalesResponse.status, 302);
    assert.equal(
      internationalSalesResponse.headers.get('location'),
      '/products/salesRequest'
    );

    // Rejected submission must not generate another email.
    assert.equal(sentEmails.length, 1);

    // International Sales Request with privacy consent must succeed.
    const consentedSalesData = new URLSearchParams(formData);
    consentedSalesData.set('country', 'Canada');
    consentedSalesData.set('state', 'Not Available');
    consentedSalesData.set('confirmPrivacy', 'yes');

    const consentedSalesResponse = await fetch(
      `http://127.0.0.1:${port}/products/salesRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
        },
        body: consentedSalesData,
      }
    );

    assert.equal(consentedSalesResponse.status, 302);
    assert.equal(
      consentedSalesResponse.headers.get('location'),
      '/products/salesRequest'
    );

    // Accepted international Sales Request generates one additional email.
    assert.equal(sentEmails.length, 2);
    assert.equal(
      sentEmails[1].subject,
      'TransTech Systems Sales Request Form'
    );

    // Simulate a separate customer IP for Repair Request submissions.
    const repairCustomerIp = '198.51.100.20';

    // Verify the Repair Request form using the same mocked services.
    const repairData = new URLSearchParams({
      name: 'Repair & <b>Test</b> User',
      company: 'Test Company',
      address: '123 Test Street',
      city: 'Albany',
      state: 'New York',
      zip: '12207',
      country: 'United States',
      residential: 'No',
      phone: '5551234567',
      email: 'test@example.com',
      repairProduct: 'PQI 380 Plus',
      repairSerial: 'TEST-12345',
      repairQty: '1',
      estimate: 'Over $1000',
      serviceMessage: 'Automated Repair Request test',
      'g-recaptcha-response': 'mock-valid-token',
    });

    const repairResponse = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': repairCustomerIp,
        },
        body: repairData,
      }
    );

    assert.equal(repairResponse.status, 302);
    assert.equal(
      repairResponse.headers.get('location'),
      '/products/repairRequest'
    );

    // One Sales email + two Repair emails.
    assert.equal(sentEmails.length, 4);

    // Internal Repair Request notification.
    assert.equal(
      sentEmails[2].subject,
      'TransTech Systems Repair Request Form'
    );
    assert.match(
      sentEmails[2].html,
      /Automated Repair Request test/
    );
    assert.match(sentEmails[2].html, /TEST-12345/);

    // Customer confirmation.
    assert.equal(
      sentEmails[3].subject,
      'TransTech Systems Calibration/Repair Request Received'
    );
    assert.equal(sentEmails[3].to, 'test@example.com');
    assert.match(sentEmails[3].html, /TEST-12345/);

    // Verify HTML-sensitive customer information is safely escaped.
    assert.match(sentEmails[2].html, /Repair &amp; Test User/);
    assert.doesNotMatch(sentEmails[2].html, /<b>Test<\/b>/);

    assert.match(sentEmails[3].html, /Repair &amp; Test User/);
    assert.doesNotMatch(sentEmails[3].html, /<b>Test<\/b>/);

    // International Repair Request without privacy consent must be rejected.
    const internationalRepairData = new URLSearchParams(repairData);
    internationalRepairData.set('country', 'Canada');
    internationalRepairData.set('state', 'Not Available');
    internationalRepairData.delete('confirmPrivacy');

    const internationalResponse = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': repairCustomerIp,
        },
        body: internationalRepairData,
      }
    );

    assert.equal(internationalResponse.status, 302);
    assert.equal(
      internationalResponse.headers.get('location'),
      '/products/repairRequest'
    );

    // No additional emails should have been generated.
    assert.equal(sentEmails.length, 4);

    // International Repair Request with privacy consent must succeed.
    const consentedRepairData = new URLSearchParams(repairData);
    consentedRepairData.set('country', 'Canada');
    consentedRepairData.set('state', 'Not Available');
    consentedRepairData.set('confirmPrivacy', 'yes');

    const consentedResponse = await fetch(
      `http://127.0.0.1:${port}/products/repairRequest`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': repairCustomerIp,
        },
        body: consentedRepairData,
      }
    );

    assert.equal(consentedResponse.status, 302);
    assert.equal(
      consentedResponse.headers.get('location'),
      '/products/repairRequest'
    );

    // An accepted Repair Request generates two additional emails.
    assert.equal(sentEmails.length, 6);
    assert.equal(
      sentEmails[4].subject,
      'TransTech Systems Repair Request Form'
    );
    assert.equal(
      sentEmails[5].subject,
      'TransTech Systems Calibration/Repair Request Received'
    );

    // Product Registration HTML escaping regression test.
    const registrationData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test & Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      registerProduct: 'PQI 380 Plus',
      date: '2026-11-23',
      serial: 'TEST-REG-123',
    });

    const registrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/productRegistration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': '198.51.100.30',
        },
        body: registrationData,
      }
    );

    assert.equal(registrationResponse.status, 302);
    assert.equal(
      registrationResponse.headers.get('location'),
      '/products/productRegistration'
    );

    // Product Registration should generate one notification email.
    assert.equal(sentEmails.length, 7);
    assert.equal(
      sentEmails[6].subject,
      'TransTech Systems Product Registration Form'
    );
    assert.equal(sentEmails[6].to, 'cborski@transtechsys.com');

    // Verify customer values are safely represented in the HTML email.
    assert.match(sentEmails[6].html, /Test &amp; Company/);
    assert.match(sentEmails[6].html, /PQI 380 Plus/);
    assert.doesNotMatch(sentEmails[6].html, /<b>PQI 380 Plus<\/b>/);
    assert.match(sentEmails[6].html, /TEST-REG-123/);

    // International Product Registration without consent must be rejected.
    const internationalRegistrationData = new URLSearchParams(registrationData);
    internationalRegistrationData.set('country', 'Canada');
    internationalRegistrationData.set('state', 'Not Available');

    const internationalRegistrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/productRegistration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': '198.51.100.30',
        },
        body: internationalRegistrationData,
      }
    );

    assert.equal(internationalRegistrationResponse.status, 302);
    assert.equal(
      internationalRegistrationResponse.headers.get('location'),
      '/products/productRegistration'
    );

    // Rejected international registration must not generate an email.
    assert.equal(sentEmails.length, 7);

    // International Product Registration with consent must succeed.
    const consentedRegistrationData = new URLSearchParams(registrationData);
    consentedRegistrationData.set('country', 'Canada');
    consentedRegistrationData.set('state', 'Not Available');
    consentedRegistrationData.set('confirmPrivacy', 'yes');

    const consentedRegistrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/productRegistration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
          'X-Forwarded-For': '198.51.100.30',
        },
        body: consentedRegistrationData,
      }
    );

    assert.equal(consentedRegistrationResponse.status, 302);
    assert.equal(
      consentedRegistrationResponse.headers.get('location'),
      '/products/productRegistration'
    );

    // Accepted international registration generates one additional email.
    assert.equal(sentEmails.length, 8);
    assert.equal(
      sentEmails[7].subject,
      'TransTech Systems Product Registration Form'
    );

    // Integration Request HTML escaping regression test.
    const integrationData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test & Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      reach: 'Internet',
      message: 'Integration & <b>details</b>',
    });

    const integrationHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0',
      'X-Forwarded-For': '198.51.100.40',
    };

    const integrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/requestIntegration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: integrationHeaders,
        body: integrationData,
      }
    );

    assert.equal(integrationResponse.status, 302);
    assert.equal(
      integrationResponse.headers.get('location'),
      '/products/requestIntegration'
    );

    assert.equal(sentEmails.length, 9);
    assert.equal(
      sentEmails[8].subject,
      'Request TransTech Connect Integration Form'
    );
    assert.equal(sentEmails[8].to, 'sales@transtechsys.com');

    assert.match(sentEmails[8].html, /Test &amp; Company/);
    assert.match(sentEmails[8].html, /Integration &amp; details/);
    assert.doesNotMatch(sentEmails[8].html, /<b>details<\/b>/);

    // International Integration Request without consent must be rejected.
    const internationalIntegrationData = new URLSearchParams(integrationData);
    internationalIntegrationData.set('country', 'Canada');
    internationalIntegrationData.set('state', 'Not Available');

    const internationalIntegrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/requestIntegration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: integrationHeaders,
        body: internationalIntegrationData,
      }
    );

    assert.equal(internationalIntegrationResponse.status, 302);
    assert.equal(
      internationalIntegrationResponse.headers.get('location'),
      '/products/requestIntegration'
    );
    assert.equal(sentEmails.length, 9);

    // International Integration Request with consent must succeed.
    const consentedIntegrationData = new URLSearchParams(integrationData);
    consentedIntegrationData.set('country', 'Canada');
    consentedIntegrationData.set('state', 'Not Available');
    consentedIntegrationData.set('confirmPrivacy', 'yes');

    const consentedIntegrationResponse = await fetch(
      `http://127.0.0.1:${port}/products/requestIntegration`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: integrationHeaders,
        body: consentedIntegrationData,
      }
    );

    assert.equal(consentedIntegrationResponse.status, 302);
    assert.equal(
      consentedIntegrationResponse.headers.get('location'),
      '/products/requestIntegration'
    );
    assert.equal(sentEmails.length, 10);
    assert.equal(
      sentEmails[9].subject,
      'Request TransTech Connect Integration Form'
    );

    // Trade-Up HTML escaping regression test.
    const tradeUpData = new URLSearchParams({
      name: 'Automated Test User',
      company: 'Test & Company',
      state: 'New York',
      country: 'United States',
      phone: '5551234567',
      email: 'test@example.com',
      tradeProduct: '<b>PQI 380</b>',
      tradeSerial: 'TRADE-12345',
      tradeMessage: 'Trade comments & <b>additional details</b>',
    });

    const tradeUpResponse = await fetch(
      `http://127.0.0.1:${port}/products/tradeUp`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          ...integrationHeaders,
          'X-Forwarded-For': '198.51.100.50',
        },
        body: tradeUpData,
      }
    );

    assert.equal(tradeUpResponse.status, 302);
    assert.equal(
      tradeUpResponse.headers.get('location'),
      '/products/tradeUp'
    );

    // U.S. Trade-Up submission generates one notification email.
    assert.equal(sentEmails.length, 11);
    assert.equal(
      sentEmails[10].subject,
      'TransTech Systems Trade Up Request Form'
    );
    assert.equal(
      sentEmails[10].to,
      'tapkarian@transtechsys.com, cdavis@transtechsys.com'
    );

    // Verify customer values are safely escaped.
    assert.match(sentEmails[10].html, /Test &amp; Company/);
    assert.match(sentEmails[10].html, /PQI 380/);
    assert.doesNotMatch(sentEmails[10].html, /<b>PQI 380<\/b>/);
    assert.match(sentEmails[10].html, /TRADE-12345/);
    assert.match(
      sentEmails[10].html,
      /Trade comments &amp; additional details/
    );
    assert.doesNotMatch(
      sentEmails[10].html,
      /<b>additional details<\/b>/
    );

    // International Trade-Up without consent must be rejected.
    const internationalTradeUpData = new URLSearchParams(tradeUpData);
    internationalTradeUpData.set('country', 'Canada');
    internationalTradeUpData.set('state', 'Not Available');

    const internationalTradeUpResponse = await fetch(
      `http://127.0.0.1:${port}/products/tradeUp`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          ...integrationHeaders,
          'X-Forwarded-For': '198.51.100.50',
        },
        body: internationalTradeUpData,
      }
    );

    assert.equal(internationalTradeUpResponse.status, 302);
    assert.equal(
      internationalTradeUpResponse.headers.get('location'),
      '/products/tradeUp'
    );
    assert.equal(sentEmails.length, 11);

    // International Trade-Up with consent must succeed.
    const consentedTradeUpData = new URLSearchParams(tradeUpData);
    consentedTradeUpData.set('country', 'Canada');
    consentedTradeUpData.set('state', 'Not Available');
    consentedTradeUpData.set('confirmPrivacy', 'yes');

    const consentedTradeUpResponse = await fetch(
      `http://127.0.0.1:${port}/products/tradeUp`,
      {
        method: 'POST',
        redirect: 'manual',
        headers: {
          ...integrationHeaders,
          'X-Forwarded-For': '198.51.100.50',
        },
        body: consentedTradeUpData,
      }
    );

    assert.equal(consentedTradeUpResponse.status, 302);
    assert.equal(
      consentedTradeUpResponse.headers.get('location'),
      '/products/tradeUp'
    );
    assert.equal(sentEmails.length, 12);
    assert.equal(
      sentEmails[11].subject,
      'TransTech Systems Trade Up Request Form'
    );

  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    if (originalTransporter) {
      require.cache[transporterPath] = originalTransporter;
    } else {
      delete require.cache[transporterPath];
    }

    if (originalCaptcha) {
      require.cache[captchaPath] = originalCaptcha;
    } else {
      delete require.cache[captchaPath];
    }

    fs.rmSync(directory, { recursive: true, force: true });
  }
});
