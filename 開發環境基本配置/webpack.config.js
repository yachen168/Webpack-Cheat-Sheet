const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   /* 每次 build 前清理 /dist 文件夹 */

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    /* 輸出文件名 */
    filename: 'bundle.js',
    /* 輸出路徑 (絕對路徑)，resolve 用來拼接絕對路徑，__dirname 為 nodejs 變量，代表當前文件的目錄絕對路徑*/
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  // devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    /* 建立一個「空的」 HTML 檔案，引入所有打包後資源(例如：JS、CSS) */
    new HtmlWebpackPlugin({
      title: 'Development',
      /* 複製 ./src/index.html 文件，引入所有打包後資源(例如：JS、CSS) */
      template: './src/index.html'
    })
  ],
  /* 自動編譯，不會有任何輸出(dist 資料夾內容不變)，需安裝 webpack-dev-server */
  devServer: {
    /* 項目構建後的路徑 */
    contentBase: path.join(__dirname, 'dist'),
    /* gzips 壓縮 */
    compress: true,
    /* 自動打開瀏覽器 */
    open: true
  },
  module: {
    rules: [
      {
        /* 圖片處理(不包括 .html 檔案裡的 <img>) */
        test: /\.s[ac]ss$/i,
        /* 要使用多個 loader 用 use，use 陣列中 loader 執行順序：由後往前 依序執行 */
        use: [
          /* 創建 <style> 標籤，將 js 中的樣式資源插入進行，並添加到 head 中 */
          'style-loader',
          /* 將 CSS 轉換成 CommonJS module，內容為字串，加載到 .js 中 */
          'css-loader',
          /* 將 Sass 編譯成 CSS */
          'sass-loader',
        ],
      },
      /* 處理圖片資源(.html 中的) */
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          /* 大於 8K 則轉 base64 (1 KB = 1024 Bytes，8*1024=8192) */
          /* base64 優點：減少請求次數; 缺點：體積大 */
          // limit: 8192,
          /* 不將檔案轉成 base64 */
          limit: false,
          /* 指定輸出路徑 */
          outputPath: 'images'
        }
      },
      /* 處理 HTML 中的 <img> 圖片資源，再丟給 url-loader 處理 */
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
