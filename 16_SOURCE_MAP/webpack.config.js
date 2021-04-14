let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
// let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const DIST_PATH = path.resolve(__dirname, "dist");

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
      plugins: () => {
        return [
          require("postcss-preset-env")()
        ]
      }
    }
  }
];

/**
 * 开启HMR后，
 * 修改html文件不会被更新，需要修改entry
 * 修改js文件会整页面刷新，需要在入口文件设置监听
 */
module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],

  output: {
    filename: "bundle.js",
    path: DIST_PATH
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
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: "url-loader",
        options: {
          limit: 9 * 1024,
          name: "[hash:12].[ext]",
          outputPath: "./img"
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        exclude: /\.(html|css|less|js|png|jpg|jpeg|png)$/,
        loader: "file-loader",
        options: {
          outputPath: "./assets",
          name: "[hash:12].[ext]"
        }
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
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true
      // }
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.css"
    }),

    // new OptimizeCssAssetsWebpackPlugin()
  ],

  mode: "development",

  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    port: 4443,
    open: true,
    // 开启HMR, 修改样式文件就能完成热重载
    // 修改js不会热更新，会刷新整个页面
    // 会导致修改html时不更新
    hot: true
  },

  /**
   * source-map 是提供源代码到构建后代码映射的技术，便于调试
   * [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map
   * source-map 
   *  生成外部.map映射文件
   *  错误代码准确信息和源代码错误位置
   * inline-source-map
   *  source-map映射内联在js文件里面
   *  错误代码准确信息和源代码错误位置
   * hidden-source-map
   *  生成外部.map映射文件
   *  错误代码原因，没有错误位置
   *  不能追踪源代码错误，只能提示到构建后代码的错误位置
   *  可隐藏源代码
   * eval-source-map
   *  source-map映射内联在js文件里面的多个eval函数中
   *  错误代码准确信息和源代码错误位置
   * nosource-source-map
   *  生成外部.map映射文件
   *  错误代码准确信息，但是没有任何源代码信息
   *  可隐藏源代码
   * cheap-source-map
   *  生成外部.map映射文件
   *  错误代码准确信息和源代码错误位置
   *  只能精确到行
   * cheap-module-source-map
   *  生成外部.map映射文件
   *  错误代码准确信息和源代码错误位置
   * 
   * 开发环境
   *  速度快 调试友好
   *  速度(eval>inline>cheap>...)
   *   eval-cheap-source-map
   *   eval-source-map
   *  调试
   *   source-map
   *   cheap-module-source-map
   *   cheap-source-map
   *  优
   *   eval-source-map
   *   eval-cheap-module-source-map
   * 生产环境
   *  源代码隐藏 调试不友好
   *   nosource-source-map 全部隐藏
   *   hidden-source-map 只隐藏源代码，会提示到构建后代码的错误位置
   */
  devtool: "nosource-source-map"
}