const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      main: ['./src/main.js']
    },
    mode: 'production',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin,
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attributes: {
                  list: [
                    {
                      tag: 'img',
                      attribute: 'src',
                      type: 'src',
                    }
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.(jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]'
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new OptimizeCssAssetsPlugin({
        filename: '[name]-[contenthash].css'
      }),
      new MiniCssExtractPlugin(),
      new HTMLWebpackPlugin({
        template: './src/index.html',
        title: 'Hello Hyrule',
        inject: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV)
        }
      }),
      new MinifyPlugin(),
      // new UglifyJsPlugin()
      new CompressionPlugin({
        algorithm: 'gzip'
      }),
      new BrotliPlugin()
    ]
  }
};
