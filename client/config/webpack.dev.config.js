const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: false,
    port: 8080
  },
  devtool: 'source-map',
  entry: {
    'webpack': 'webpack-dev-server/client?http://localhost:8080'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
