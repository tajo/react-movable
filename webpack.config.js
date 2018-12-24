const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: ['./examples/index'],
  mode: ENV,
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
