/** @type {import('jest').Config} */
module.exports = {
  preset: '@react-native/jest-preset',
  rootDir: __dirname,
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-svg|react-native-safe-area-context|react-native-keyboard-controller|react-native-reanimated|react-native-worklets)/)',
  ],
  modulePathIgnorePatterns: ['<rootDir>/lib', '<rootDir>/example'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/test-utils/**'],
};
