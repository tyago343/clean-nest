module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@config/(.*)$': '<rootDir>/src/shared/infrastructure/config/$1',
    '^@logger/(.*)$': '<rootDir>/src/shared/infrastructure/logger/$1',
    '^@exceptions/(.*)$': '<rootDir>/src/shared/infrastructure/exceptions/$1',
    '^@repositories/(.*)$':
      '<rootDir>/src/shared/infrastructure/repositories/$1',
    '^@product/(.*)$': '<rootDir>/src/modules/Product/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/User/$1',
    '^@category/(.*)$': '<rootDir>/src/modules/Category/$1',
  },
};
