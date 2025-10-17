const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Unplugin = require('../dist/webpack')

module.exports = {
  entry: './main.ts',
  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    Unplugin({
      serveDir: '../node_modules',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist-webpack'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
}
