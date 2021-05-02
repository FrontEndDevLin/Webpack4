import '../css/index.css';
import '../css/style.less';

console.log('Webpack lazy load!');

/**
 * 
 */

document.getElementById("btn").onclick = function () {
  /**
   * 自动开启懒加载
   * 预加载Prefetch: 在加载完所有主要代码后，静默加载依赖模块，但不执行
   */
         // 参数
  import(/* webpackChunkName: "print", webpackPrefetch: true */"./print")
    .then((m) => {
      m.log();
    })
    .catch(() => {
      console.log("模块加载失败")
    });
}