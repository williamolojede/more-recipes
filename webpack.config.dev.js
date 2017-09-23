const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    app: [
      // 'eventsource-polyfill', // necessary for hot reloading with IE,
      'webpack-hot-middleware/client',
      './client/index.js',
    ]
  },
  output: {
    path: `${__dirname}/dist/client`,
    filename: 'js/bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        loader: 'babel-loader',
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
    new webpack.NoEmitOnErrorsPlugin(),
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'css/style.css',
    })
  ]
};
