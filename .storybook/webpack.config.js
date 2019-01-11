const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (_baseCnig, _env, config) => ({
  ...config,
  devtool: false,
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: [require.resolve('react-docgen-typescript-loader')]
      }
    ],
    exprContextCritical: false
  },
  plugins: [...config.plugins, new ForkTsCheckerWebpackPlugin()],
  node: {
    fs: 'empty',
    module: 'empty'
  }
});
