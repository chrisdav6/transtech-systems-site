const test = require('node:test');
const assert = require('node:assert/strict');

const botFilter = require('../utils/botFilter');

function runMiddleware(userAgent) {
  const result = {
    statusCode: null,
    message: null,
    nextCalled: false,
  };

  const req = {
    get(header) {
      if (header.toLowerCase() === 'user-agent') {
        return userAgent;
      }
      return undefined;
    },
  };

  const res = {
    status(code) {
      result.statusCode = code;
      return this;
    },
    send(message) {
      result.message = message;
      return this;
    },
  };

  botFilter(req, res, () => {
    result.nextCalled = true;
  });

  return result;
}

test('allows a legitimate Chrome browser', () => {
  const result = runMiddleware(
    'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'
  );

  assert.equal(result.nextCalled, true);
  assert.equal(result.statusCode, null);
});

test('blocks known unwanted bots', () => {
  const blockedAgents = [
    'AhrefsBot/7.0',
    'SemrushBot/7',
    'MJ12bot/v1.4',
    'DotBot/1.2',
    'MegaIndex.ru',
    'BLEXBot/1.0',
    'Python-urllib/3.12',
    'curl/8.0',
    'Wget/1.21',
    'HTTrack/3.49',
    'PHPCrawl',
    'masscan/1.3',
    'zgrab/0.x',
  ];

  for (const agent of blockedAgents) {
    const result = runMiddleware(agent);

    assert.equal(result.nextCalled, false, agent);
    assert.equal(result.statusCode, 403, agent);
    assert.equal(result.message, 'Forbidden', agent);
  }
});

test('matches blocked bots case-insensitively', () => {
  const result = runMiddleware('CURL/8.0');

  assert.equal(result.statusCode, 403);
  assert.equal(result.nextCalled, false);
});

test('allows an empty User-Agent', () => {
  const result = runMiddleware('');

  assert.equal(result.nextCalled, true);
});

test('handles a missing User-Agent', () => {
  const result = runMiddleware(undefined);

  assert.equal(result.nextCalled, true);
});

test('allows unrelated automated clients', () => {
  const result = runMiddleware('CustomMonitoringClient/1.0');

  assert.equal(result.nextCalled, true);
});
