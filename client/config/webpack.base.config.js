require('dotenv').config()
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    'main': ['@babel/polyfill', path.resolve(__dirname, '../index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: './[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../'),
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot|ico)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' }
    ]),
    new webpack.EnvironmentPlugin(['SERVER_HOST'])
  ]
}
