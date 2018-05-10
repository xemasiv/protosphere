const path = require('path');
const webpack = require('webpack');
module.exports = [
  {
    entry: ['./index.js'],
    output: {
      filename: 'protosphere.min.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    plugins: [],
    mode: "production"
  }
];
