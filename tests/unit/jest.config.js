const config = require('./package.json').config

const defaultPathsToIgnore = ['node_modules']

module.exports = {
  coverageDirectory: '<rootDir>/reports/coverage/app/',
  coveragePathIgnorePatterns: defaultPathsToIgnore,
  moduleFileExtensions: ['js', '.hbs'],
  roots: config.path.unitTests,
  testPathIgnorePatterns: defaultPathsToIgnore,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.hbs$': '<rootDir>/src/build-scripts/handlebars-loader'
  },
  verbose: true,
}
