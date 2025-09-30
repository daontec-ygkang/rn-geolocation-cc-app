module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@react-navigation/stack$': '<rootDir>/src/__mocks__/@react-navigation/stack.tsx',
    '^@react-navigation/bottom-tabs$':
      '<rootDir>/src/__mocks__/@react-navigation/bottom-tabs.tsx',
    '^@react-navigation/native$':
      '<rootDir>/src/__mocks__/@react-navigation/native.tsx',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
