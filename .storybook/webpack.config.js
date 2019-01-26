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
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../examples')
        ],
        use: [
          {
            loader: require.resolve('awesome-typescript-loader')
          }
        ]
      }
    ],
    exprContextCritical: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [...config.plugins, new ForkTsCheckerWebpackPlugin()],
  node: {
    fs: 'empty',
    module: 'empty'
  }
});
