// Promise A+ 规范，要求一个 promise 需要是「对象」或者「函数」，且它的 then 也是一个函数
function isPromiseLike(value) {
  return (
    value !== null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function'
  );
}

// 什么是 Promise?
// 一个符合 Promise A+ 规范的对象或者函数，并且该对象或者函数有 then 方法，这个对象或者函数就是一个 Promise
// ES6 里通过 Promise 构造函数就可以产生一个符合 Promise A+ 规范的 promise 对象