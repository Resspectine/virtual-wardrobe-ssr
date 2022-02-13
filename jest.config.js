const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'whatwg-fetch'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/materialUiTheme/(.*)$': '<rootDir>/materialUiTheme/$1',
    '^@/pageComponents/(.*)$': '<rootDir>/pageComponents/$1',
    '^@/routes/(.*)$': '<rootDir>/routes/$1',
    '^@/testUtils$': '<rootDir>/testUtils',
  },
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  modulePathIgnorePatterns: ['cypress'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.config*',
    '!**/types*',
    '!types/**',
    '!.next/**',
    '!coverage/**',
    '!testUtils/**',
    '!cypress/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
