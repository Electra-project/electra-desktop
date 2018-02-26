/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ConfigPath = require('./config.path');


const WebpackPlugins = [

  new HtmlWebpackPlugin({
    template: ConfigPath.indexTemplate
  }),
  new ExtractTextPlugin('bundle.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development')
  })
];

if (process.env.NODE_ENV === 'production') {
  WebpackPlugins.push(new BabiliPlugin())
}

module.exports = WebpackPlugins;
