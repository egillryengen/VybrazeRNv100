// jest.config.js
// Jest configuration for React Native + TypeScript project.
// Place this file in the repository root (same level as package.json).

module.exports = {
  preset: 'react-native',

  /**
   * setupFiles:
   * - Runs BEFORE the test framework is installed.
   * - Used for mocking native modules (Animated, LayoutAnimation, etc.).
   * - Your jest.setup.js belongs here.
   */
  setupFiles: ['<rootDir>/jest.setup.js'],

  /**
   * setupFilesAfterEnv:
   * - Runs AFTER the test framework is installed.
   * - Enables globals like afterAll, beforeEach, expect extensions, etc.
   * - You may keep jest.setup-after-env.js if you still need it.
   * - If not needed, you can remove it later.
   */
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],

  /**
   * Transform JS/TS files using babel-jest.
   * Assumes Babel is configured to handle TypeScript.
   */
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Recognize these file extensions in imports
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Map absolute imports from "src/..." to the src folder and mock socket.io-client
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^socket.io-client$': '<rootDir>/__mocks__/socket.io-client.js',
  },

  // Ignore these paths when running tests
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],

  /**
   * Transform ignore pattern:
   * Allow transforming some node_modules that ship ESM.
   */
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community)/)',
  ],

  // Cache directory for jest transforms
  cacheDirectory: '.jest/cache',

  // Use node environment (React Native preset will provide necessary shims)
  testEnvironment: 'node',

  // Increase default timeout for slow environments (optional)
  testTimeout: 10000,
};
