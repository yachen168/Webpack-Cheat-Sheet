const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   /* 每次 build 前清理 /dist 文件夹 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); /* separate CSS from js */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); /* CSS 壓縮 */

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash:8][ext]'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    /* If you want to run it also in development set the optimization.minimize option to true */
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
