/* eslint-env jest */
// jest.setup.js
//
// Global Jest setup for VybrazeRNv100
// - Stubs React Native internals to silence warnings
// - Registers shared mocks for userRepository + useDebouncedSave
// - Ensures tests can override implementations freely
// - Compatible med container test strategy (runtime require + per-test overrides)

// ---------------------------------------------------------------------------
// React Native stubs (beholdt fra original fil)
// ---------------------------------------------------------------------------

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  create: jest.fn(),
  Types: {easeInEaseOut: 'easeInEaseOut'},
  Properties: {opacity: 'opacity'},
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
