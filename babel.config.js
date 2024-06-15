module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@/components': './src/components',
          '@/config': './src/config',
          '@/constants': './src/constants',
          '@/hooks': './src/hooks',
          '@/locales': './src/locales',
          '@/navigation': './src/navigation',
          '@/redux': './src/redux',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/styles': './src/styles',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
