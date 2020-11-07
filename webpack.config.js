const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   // 每次 build 前清理 /dist 文件夹

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    })
  ],
  devServer: {
    // publicPath: './dist',
    contentBase: path.join(__dirname, 'dist'),
    open: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 將 JS 字符串生成為 <style> 標籤
          'style-loader',
          // 將 CSS 轉換成 CommonJS module
          'css-loader',
          // 將 Sass 編譯成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
