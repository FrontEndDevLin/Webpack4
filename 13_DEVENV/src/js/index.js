import '../css/index.css';
import '../css/index.less';
import '../font/iconfont.css';

console.log('Hello webpack development');

const p = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

const promise = p().then(() => {
  console.log('promise执行了');
  console.log(promise);
});
