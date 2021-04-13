let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let ESLintWebpackPlugin = require("eslint-webpack-plugin");

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

module.exports = {
  entry: "./src/js/index.js",

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
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.css"
    }),

    new OptimizeCssAssetsWebpackPlugin(),

    new ESLintWebpackPlugin({
      fix: true
    })
  ],

  mode: "production",

  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    port: 4443,
    open: true
  }
}