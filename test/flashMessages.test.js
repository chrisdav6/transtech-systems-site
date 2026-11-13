const test = require('node:test');
const assert = require('node:assert/strict');

const flashMessages = require('../utils/flashMessages');

function createRequest(session = {}) {
  const req = { session };
  let nextCalled = false;

  flashMessages()(req, {}, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);

  return req;
}

test('stores and retrieves success messages', () => {
  const req = createRequest();

  assert.equal(req.flash('success', 'Message sent!'), 1);
  assert.deepEqual(req.flash('success'), ['Message sent!']);
});

test('preserves multiple messages of the same type', () => {
  const req = createRequest();

  req.flash('error', 'First error');
  req.flash('error', 'Second error');

  assert.deepEqual(req.flash('error'), [
    'First error',
    'Second error',
  ]);
});

test('removes messages after retrieval', () => {
  const req = createRequest();

  req.flash('success', 'Saved successfully');

  assert.deepEqual(req.flash('success'), ['Saved successfully']);
  assert.deepEqual(req.flash('success'), []);
});

test('keeps different message types independent', () => {
  const req = createRequest();

  req.flash('success', 'Saved');
  req.flash('error', 'Something went wrong');

  assert.deepEqual(req.flash('success'), ['Saved']);
  assert.deepEqual(req.flash('error'), ['Something went wrong']);
});

test('supports arrays of messages', () => {
  const req = createRequest();

  assert.equal(
    req.flash('error', ['Invalid email', 'Missing name']),
    2
  );

  assert.deepEqual(req.flash('error'), [
    'Invalid email',
    'Missing name',
  ]);
});

test('supports formatted messages', () => {
  const req = createRequest();

  req.flash('success', 'Hello %s, your ID is %d', 'Chris', 42);

  assert.deepEqual(req.flash('success'), [
    'Hello Chris, your ID is 42',
  ]);
});

test('clears all message types when called without arguments', () => {
  const req = createRequest();

  req.flash('success', 'Saved');
  req.flash('error', 'Error');

  assert.deepEqual(req.flash(), {
    success: ['Saved'],
    error: ['Error'],
  });

  assert.deepEqual(req.flash('success'), []);
  assert.deepEqual(req.flash('error'), []);
});

test('requires an active session', () => {
  const req = createRequest(null);

  assert.throws(
    () => req.flash('success', 'Test'),
    /req\.flash\(\) requires sessions/
  );
});

test('preserves an existing flash function by default', () => {
  const existingFlash = () => 'existing';
  const req = {
    session: {},
    flash: existingFlash,
  };

  let nextCalled = false;

  flashMessages()(req, {}, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.flash, existingFlash);
});

test('can replace an existing flash function when unsafe is enabled', () => {
  const existingFlash = () => 'existing';
  const req = {
    session: {},
    flash: existingFlash,
  };

  flashMessages({ unsafe: true })(req, {}, () => {});

  assert.notEqual(req.flash, existingFlash);

  req.flash('success', 'Replacement works');

  assert.deepEqual(req.flash('success'), ['Replacement works']);
});
