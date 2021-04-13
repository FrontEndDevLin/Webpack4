let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let commonCssLoaders = [
  MiniCssExtractPlugin.loader,
  // "style-loader",
  "css-loader"
];

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: commonCssLoaders
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoaders,
          "less-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.css"
    })
  ],

  mode: "development"
}