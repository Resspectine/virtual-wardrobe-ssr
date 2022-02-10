const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/materialUiTheme/(.*)$': '<rootDir>/materialUiTheme/$1',
    '^@/pageComponents/(.*)$': '<rootDir>/pageComponents/$1',
    '^@/routes/(.*)$': '<rootDir>/routes/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/*.config*', '!**/types/**'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
