export function log() {
  console.log('来自 print.js log方法');
}

export function sum(...args) {
  console.log('调用sum方法');
  return args.reduce((t, n) => t - n);
}

console.log('print.js被加载了');
