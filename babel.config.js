module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
