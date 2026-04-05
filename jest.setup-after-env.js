/* eslint-env jest */
// jest.setup-after-env.js
// This file runs after the test framework is installed and has access to Jest globals like afterAll

// Debug helper: log active Node handles at the end of the test run.
afterAll(() => {
  try {
    const handles = process._getActiveHandles();
    console.log(
      'DEBUG: Active handles at end of tests:',
      handles.map(h => (h && h.constructor && h.constructor.name) || String(h)),
    );
  } catch (e) {
    console.error('DEBUG: Could not list active handles', e);
  }
});
