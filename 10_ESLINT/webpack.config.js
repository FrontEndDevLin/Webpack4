let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    // 读取package.json中eslintConfig或.eslintrc中的配置
    new ESLintPlugin({
      // 自动修复eslint的错误
      fix: true
    })
  ],

  mode: "development"
}