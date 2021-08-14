const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.svg/,
        include: /src/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
}
