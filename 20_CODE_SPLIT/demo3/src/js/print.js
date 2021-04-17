export function log() {
  console.log('print.js 被加载了~~');
}

export function sum(...args) {
  console.log('调用sum方法');
  return args.reduce((t, n) => t - n);
}
