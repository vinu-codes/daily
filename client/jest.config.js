const testPathIgnorePatterns = [
  '/config-generator/dist',
  '/cypress/',
  '/platform/',
  '/node_modules/',
]

const setupFilesAfterEnv = ['./test/setupJestTest.js']

const testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.js$'

const moduleDirectories = ['node_modules']

const transform = {
  '^.+\\.jsx?$': ['babel-jest', { configFile: './.babelrc' }],
}

const transformIgnorePatterns = [
  //"/node_modules/(?!react-markdown|vfile|unist-util-stringify-position|unified|bail|is-plain-obj).+\\.js$"
]

const testEnvironment = 'jsdom'

const moduleFileExtensions = ['js']

const moduleNameMapper = {
  '@common/(.*)': '<rootDir>/src/common/$1',
  '@features/(.*)': '<rootDir>/src/features/$1',
  '@hooks/(.*)': '<rootDir>/src/hooks/$1',
  '@utils/(.*)': '<rootDir>/src/utils/$1',
  '@mocks/(.*)': '<rootDir>/src/mocks/$1',
  '@test/(.*)': '<rootDir>/src/test/$1',
  '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
}

module.exports = {
  testRegex,
  testPathIgnorePatterns,
  setupFilesAfterEnv,
  moduleNameMapper,
  moduleDirectories,
  transform,
  transformIgnorePatterns,
  moduleFileExtensions,
  testEnvironment,
}
