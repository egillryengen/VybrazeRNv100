/* eslint-env jest */
// jest.setup.js
// Silence Animated native driver warning and stub native animated helper
// This file runs before tests and should be referenced from jest.config.js setupFiles.

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  create: jest.fn(),
  Types: {easeInEaseOut: 'easeInEaseOut'},
  Properties: {opacity: 'opacity'},
}));
