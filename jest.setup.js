/* eslint-env jest */
// jest.setup.js
//
// Global Jest setup for VybrazeRNv100
// - Stubs React Native internals to silence warnings
// - Registers shared mocks for userRepository + useDebouncedSave
// - Ensures tests can override implementations freely
// - Tracks sockets created during module import and tests to stabilize CI
// - Compatible med container test strategy (runtime require + per-test overrides)

// ---------------------------------------------------------------------------
// Early socket tracking (runs before modules are imported)
// ---------------------------------------------------------------------------

const globalAny = global;

// Ensure a place to store sockets
globalAny.__TEST_SOCKETS__ = globalAny.__TEST_SOCKETS__ || [];

// Monkeypatch Node net.Socket to track created sockets (if available)
try {
  // eslint-disable-next-line global-require
  const net = require('net');
  if (net && net.Socket && !net.Socket.__patchedForTests) {
    const OriginalSocket = net.Socket;
    function TrackingSocket(...args) {
      const sock = new OriginalSocket(...args);
      try { globalAny.__TEST_SOCKETS__.push(sock); } catch (e) {}
      return sock;
    }
    TrackingSocket.prototype = OriginalSocket.prototype;
    TrackingSocket.__patchedForTests = true;
    net.Socket = TrackingSocket;
  }
} catch (e) {
  // ignore if net not available
}

// Track global WebSocket if present (browser-like or RN polyfill)
try {
  if (typeof globalAny.WebSocket === 'function' && !globalAny.WebSocket.__patchedForTests) {
    const OriginalWS = globalAny.WebSocket;
    function TrackingWebSocket(url, protocols, options) {
      const ws = new OriginalWS(url, protocols, options);
      try { globalAny.__TEST_SOCKETS__.push(ws); } catch (e) {}
      return ws;
    }
    TrackingWebSocket.prototype = OriginalWS.prototype;
    TrackingWebSocket.__patchedForTests = true;
    globalAny.WebSocket = TrackingWebSocket;
  }
} catch (e) {
  // ignore
}

// Provide a helper to close sockets on demand (useful in tests or cleanup)
globalAny.__closeAllTestSockets = function closeAllTestSockets() {
  try {
    if (Array.isArray(globalAny.__TEST_SOCKETS__) && globalAny.__TEST_SOCKETS__.length) {
      globalAny.__TEST_SOCKETS__.forEach(s => {
        try {
          if (!s) return;
          if (typeof s.close === 'function') s.close();
          else if (typeof s.destroy === 'function') s.destroy();
          else if (typeof s.terminate === 'function') s.terminate();
        } catch (e) {}
      });
      globalAny.__TEST_SOCKETS__.length = 0;
    }
  } catch (e) {}
};

// ---------------------------------------------------------------------------
// React Native stubs (beholdt fra original fil)
// ---------------------------------------------------------------------------

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  create: jest.fn(),
  Types: { easeInEaseOut: 'easeInEaseOut' },
  Properties: { opacity: 'opacity' },
}));

// ---------------------------------------------------------------------------
// Shared mocks for User feature
// ---------------------------------------------------------------------------

// Always mock userRepository (tests override implementations)
jest.mock('./src/features/user/repositories/userRepository');

// Always mock useDebouncedSave (tests override implementations)
jest.mock('./src/features/user/hooks/useDebouncedSave', () => {
  return {
    useDebouncedSave: () => ({
      debouncedSave: jest.fn(),
      flush: jest.fn(),
      cancel: jest.fn(),
    }),
  };
});
