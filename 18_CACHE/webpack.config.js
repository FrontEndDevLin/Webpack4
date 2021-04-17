let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 缓存
 *  babel缓存
 *    cacheDirectory: true
 *    作用: 让第二次打包更快(开发模式)
 *  文件资源缓存
 *    hash, 每次构建会生成一个hash值
 *     问题：css和js使用同一个hash值，修改一个文件时，会导致其他文件缓存失败
 *    chunkhash, 根据chunk生成hash。如果打包来源于同一个chunk, hash会一样
 *     问题：css和js的hash值还是一样，因为同属于一个chunk
 *    contenthash, 根据文件内容生成的hash, hash不一样
 *    作用: 让代码上线运行缓存更好使用
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
  entry: ["./src/js/index.js", "./src/index.html"],

  output: {
    filename: "bundle.[contenthash:10].js",
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
            test: /\.(jpe?g|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 9 * 1024,
              name: "[name].[hash:10].[ext]",
              outputPath: "./img"
            }
          },
          {
            exclude: /\.(html|css|js|less|jpe?g|png|gif)$/,
            loader: "file-loader",
            options: {
              name: "[name].[hash:10].[ext]",
              outputPath: "./assets"
            }
          },
          {
            test: /\.html$/,
            loader: "html-loader"
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

  mode: "development",

  devServer: {
    contentBase: DIST_PATH,
    port: 4443,
    open: true,
    compress: true
  }
  // devtool: "eval-cheap-module-source-map"
}