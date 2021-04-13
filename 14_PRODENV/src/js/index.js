import '../css/index.css';
import '../css/style.less';
import '../font/iconfont.css';

console.log('Hello webpack prod env');

const p = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

const promise = p().then(() => {
  console.log('promise 执行完');
  console.log(promise);
});
