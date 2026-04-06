/* eslint-env jest */
// jest.setup-after-env.js
// This file runs after the test framework is installed and has access to Jest globals like afterAll

// --- Socket tracking and robust cleanup to stabilize CI snapshot runs ---

const globalAny = global;

// Ensure a place to store sockets
globalAny.__TEST_SOCKETS__ = globalAny.__TEST_SOCKETS__ || [];

// Monkeypatch Node net.Socket to track created sockets (if running in Node)
try {
  // require only if available (Node environment)
  // eslint-disable-next-line global-require
  const net = require('net');
  if (net && net.Socket && !net.Socket.__patchedForTests) {
    const OriginalSocket = net.Socket;
    function TrackingSocket(...args) {
      const sock = new OriginalSocket(...args);
      try {
        globalAny.__TEST_SOCKETS__.push(sock);
      } catch (e) {
        // ignore
      }
      return sock;
    }
    // copy prototype so instanceof still works
    TrackingSocket.prototype = OriginalSocket.prototype;
    TrackingSocket.__patchedForTests = true;
    net.Socket = TrackingSocket;
  }
} catch (e) {
  // not running in Node or net not available — ignore
}

// Track global WebSocket if present (browser-like or RN polyfill)
try {
  if (typeof globalAny.WebSocket === 'function' && !globalAny.WebSocket.__patchedForTests) {
    const OriginalWS = globalAny.WebSocket;
    function TrackingWebSocket(url, protocols, options) {
      const ws = new OriginalWS(url, protocols, options);
      try {
        globalAny.__TEST_SOCKETS__.push(ws);
      } catch (e) {}
      return ws;
    }
    TrackingWebSocket.prototype = OriginalWS.prototype;
    TrackingWebSocket.__patchedForTests = true;
    globalAny.WebSocket = TrackingWebSocket;
  }
} catch (e) {
  // ignore
}

// afterEach cleanup to close sockets and reset mocks/timers
afterEach(() => {
  try {
    if (Array.isArray(globalAny.__TEST_SOCKETS__) && globalAny.__TEST_SOCKETS__.length) {
      // Close each socket-like object if it has a close/destroy/terminate/end method
      globalAny.__TEST_SOCKETS__.forEach(s => {
        try {
          if (!s) return;
          if (typeof s.close === 'function') {
            s.close();
          } else if (typeof s.destroy === 'function') {
            s.destroy();
          } else if (typeof s.terminate === 'function') {
            s.terminate();
          } else if (typeof s.end === 'function') {
            s.end();
          }
        } catch (e) {
          // ignore individual close errors
        }
      });
      // Clear the array for next test
      globalAny.__TEST_SOCKETS__.length = 0;
    }
  } catch (e) {
    // ignore cleanup errors
  }

  // General Jest cleanup
  try { jest.clearAllMocks(); } catch (e) {}
  try { jest.useRealTimers(); } catch (e) {}
});

// Debug helper: log active Node handles at the end of the test run.
// Only log locally (not in CI) to avoid noisy CI logs.
afterAll(() => {
  if (process.env.CI) return;
  try {
    const handles = typeof process._getActiveHandles === 'function'
      ? process._getActiveHandles().map(h => (h && h.constructor && h.constructor.name) || String(h))
      : [];
    if (handles && handles.length) {
      // eslint-disable-next-line no-console
      console.log('DEBUG: Active handles at end of tests:', handles);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('DEBUG: Could not list active handles', e);
  }
});
