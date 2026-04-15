module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/tests/styleMock.cjs',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/tests/fileMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: {
          jsx: 'react-jsx',
          module: 'CommonJS',
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
}
