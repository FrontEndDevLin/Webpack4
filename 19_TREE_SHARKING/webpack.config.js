let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let ESLintWebpackPlugin = require("eslint-webpack-plugin");

/**
 * tree shaking
 *  使用es6模块，mode为production
 *   可减少代码体积
 *  在package.json中配置
 *   "sideEffects": false 所有代码都会进行tree shaking
 *   问题：可能会把css文件等杀掉
 *   "sideEffects": ["*.css", "*.less"]
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
    }),

    new ESLintWebpackPlugin({
      // 自动修复eslint的错误
      fix: true
    })
  ],

  mode: "production",

  devServer: {
    contentBase: DIST_PATH,
    port: 4443,
    open: true,
    compress: true
  }
  // devtool: "eval-cheap-module-source-map"
}