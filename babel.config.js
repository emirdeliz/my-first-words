module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }]
    ],
    plugins: [
      // 'react-native-worklets/plugin' // Removed to avoid conflicts with react-native-reanimated
    ],
  };
};