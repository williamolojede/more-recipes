

module.exports = {
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/tests/setupTest.js',
    '<rootDir>/tests/__mocks__/localStorage.mock.js',
    '<rootDir>/tests/__mocks__/eventObject.mock.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests/setupTest.js',
    '<rootDir>/config/',
    '<rootDir>/coverage/',
    '<rootDir>/tests/__mocks__'
  ],
};
