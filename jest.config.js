// jest.config.js
// Jest configuration for React Native + TypeScript project.
// Place this file in the repository root (same level as package.json).

module.exports = {
  preset: 'react-native',

  // Run this file before the test framework is installed in the environment.
  // Use it to mock native modules (Animated, LayoutAnimation, etc.).
  setupFiles: ['<rootDir>/jest.setup.js'],

  // Add setupFilesAfterEnv to enable Jest globals like afterAll
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],

  // Transform JS/TS files using babel-jest (assumes Babel is configured to handle TS).
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Recognize these file extensions in imports
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Map absolute imports from "src/..." to the src folder
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Ignore these paths when running tests
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],

  // Transform ignore pattern: allow transforming some node_modules that ship ESM
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
