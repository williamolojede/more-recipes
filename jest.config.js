module.exports = {
  rootDir: 'client',
  roots: ['<rootDir>/tests/'],
  setupFiles: ['<rootDir>/tests/setupTest.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: ['!<rootDir>/tests/setupTest.js'],
};
