module.exports = {
  rootDir: 'client',
  roots: ['<rootDir>/tests/'],
  setupFiles: [
    '<rootDir>/tests/setupTest.js',
    '<rootDir>/__mocks__/localStorage.mock.js',
    '<rootDir>/__mocks__/eventObject.mock.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: ['!<rootDir>/tests/setupTest.js'],
};
