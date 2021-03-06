const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: [
      path.resolve(__dirname, 'src/public'),
      //path.resolve(__dirname, 'assets'),
    ],
    host: '0.0.0.0',
    port: 8000,
  },
  module: {
    rules: [

      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', /*'react',*/ 'stage-2'],
            plugins: [
              "transform-decorators-legacy",
              "transform-class-properties",
              "transform-strict-mode",
            ]

          }
        }
      },

//      // https://webpack.js.org/loaders/eslint-loader/
//      {
//        test: /\.jsx?$/,
//        exclude: /node_modules/,
//        use: ['babel-loader', 'eslint-loader'],
//      },

      // https://webpack.js.org/loaders/sass-loader/
//      {
//        test: /\.scss$/,
//        use: [{
//          loader: 'style-loader'
//        }, {
//          loader: 'css-loader'
//        }, {
//          loader: 'sass-loader'
//        }]
//      }
    ]
  },
  plugins: [
//    new webpack.ProvidePlugin({
//      $: 'jquery',
//      _: 'lodash',
//    })
  ]
};
