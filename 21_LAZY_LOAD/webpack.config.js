let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * lazy load 按需加载
 * 在js文件中配置
 */

let DIST_PATH = path.resolve(__dirname, "dist");

let commonCssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../"
    }
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [
        require("postcss-preset-env")()
      ]
    }
  }
];

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "[name].[contenthash:10].js",
    path: DIST_PATH
  },

  module: {
    rules: [
      {
        oneOf: [
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
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17"
                    }
                  }
                ]
              ],

              // 开启babel缓存，第二次构建时会读取之前的缓存
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.[contenthash:10].css"
    })
  ],

  /**
   * 1. 可将node_modules中的代码打包成一个chunk输出 
   */
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  mode: "production",

  devServer: {
    contentBase: DIST_PATH,
    port: 4443,
    open: true,
    compress: true
  },

  devtool: "eval-cheap-module-source-map"
}