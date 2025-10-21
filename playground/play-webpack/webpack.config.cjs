// @ts-check
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Unplugin = require('../../dist/webpack').default

module.exports = {
  entry: './main.ts',
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
    }),
    Unplugin({
      serveDir: 'node_modules',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: false,
  },
}
