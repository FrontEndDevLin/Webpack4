import $ from 'jquery';

import '../css/index.css';
import '../css/style.less';

console.log('Webpack code split!');
console.log($);

/**
 * 通过js代码，让某个文件单独打包成一个chunk
 * import动态导入语法，能让某个文件单独打包
 * 注意: 需要关闭eslint
 */
        // 参数
import(/* webpackChunkName: "print" */"./print")
  .then((m) => {
    m.log();
  })
  .catch(() => {
    console.log("模块加载失败")
  });