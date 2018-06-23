const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJsPlugin()
  ]
})
