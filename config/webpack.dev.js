const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: ['./src/main'],
    polyfills: ['./src/angular-polyfills'],
    angular: ['./src/angular']
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
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
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.join(__dirname, "../tsconfig.json")
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.join(__dirname, './src'),
      {}
    ),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
