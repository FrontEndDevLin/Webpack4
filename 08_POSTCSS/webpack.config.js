let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "development";

let commonCssLoaders = [
  MiniCssExtractPlugin.loader,
  // "style-loader", 
  "css-loader",

  /**
   * css兼容性处理：postcss --> postcss-loader postcss-preset-env,
   * postcss-preset-env从package.json等文件中帮助postcss-loader找到browserslist,
   * postcss-loader根据browserslist做相应兼容性处理
   * 默认使用production生产环境配置，
   * 需要指定开发环境需要配置process.env.NODE_ENV = "development"
   */

  /**
    写法1
    "browserslist": [
      ">0.1%",
      "not dead",
      "not op_mini all"
    ]

    写法2
    "browserslist": {
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      "production": [
        ">0.1%",
        "not dead",
        "not op_mini all"
      ]
    }
   */
  {
    loader: "postcss-loader",
    options: {
      ident: 'postcss',
      plugins: () => {
        return [
          require('postcss-preset-env')()
        ]
      }
    }
  }
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
        loader: commonCssLoaders
      },
      {
        test: /\.less$/,
        loader: [
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