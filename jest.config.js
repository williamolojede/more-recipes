

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
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests/setupTest.js',
    '<rootDir>/config/',
    '<rootDir>/utils/imageUpload.js',
    '<rootDir>/components/App.jsx',
    '<rootDir>/coverage/',
    '<rootDir>/index.jsx',
    '<rootDir>/components/hoc',
    '<rootDir>/tests/__mocks__'
  ],
};
