'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = {
  resolve: {
    extensions: ['.json', '.js', '.vue'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      '@': path.resolve(__dirname, '../src/'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  entry: path.resolve(__dirname, '../src/components/DatePicker.vue'),
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    library: 'vue-datepicker',
    libraryTarget: 'umd',
    filename: 'vue-datepicker.min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            preserveWhitespace: false,
          postcss: [
            require('autoprefixer')({
              browsers: ['last 10 versions', 'ie 11']
            }),
            require('cssnano')({
              discardComments: { removeAll: true },
            }),
          ],

          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?minimize?{discardComments:{removeAll:true}}',
          },
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        }),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]',
          },
        },
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      },
      sourceMap: config.build.productionSourceMap
    }),
    new ExtractTextPlugin({
      filename: 'vue-datepicker.min.css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = webpackConfig
