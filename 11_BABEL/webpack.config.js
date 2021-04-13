let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        /**
         * js兼容性处理 babel-loader @babel/core @babel/preset-env
         *  1. 基本的js兼容性处理 --> @babel/preset-env
         *    只能转换基本的js语法
         *  2. 全部js兼容性处理 --> @babel/polyfill
         *    全部做了兼容，一些功能用不上，过于冗余
         *  3. 按需加载 --> core-js
         */
        loader: "babel-loader",
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              "@babel/preset-env",
              {
                // 按需加载
                useBuiltIns: "usage",
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容到哪个版本的浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17"
                }
              }
            ]
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  mode: "development"
}