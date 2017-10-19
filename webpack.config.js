const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dotenv = require('dotenv');

dotenv.config();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',

      './client/index.jsx',
      // the app entry point
    ]
  },
  output: {
    path: `${__dirname}/dist/client`,
    filename: 'js/bundle.js',
    publicPath: '/static/',
  },

  // used to prevent error when using jsonwebtoken npm package on client
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        loader: [
          'react-hot-loader', // activate HMR
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000&name=[path][name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[path][name].[ext]' },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000&name=[path][name].[ext]',
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'css/style.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET)
      }
    })
  ]
  // ,
  // devServer: {
  //   noInfo: true
  // }
};
