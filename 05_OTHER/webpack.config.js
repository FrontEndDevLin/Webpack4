let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      {
        // 打包其他资源
        exclude: /\.(html|css|less|js)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:10].[ext]"
            }
          }
        ]
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