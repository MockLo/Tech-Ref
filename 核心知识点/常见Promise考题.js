console.log('start');

setTimeout(() => {
  console.log('timeout 0');
}, 0);

setTimeout(() => {
  console.log('timeout 100');
}, 100);

Promise.resolve()
  .then(() => {
    console.log(0);
    // ! 以下是重点：
    // 如果 thenable 返回值也是 promise，根据 Promise A+规范，thenable 的状态将和返回的 promise 的状态保持一致
    // 如何保持状态一直，浏览器有自己的实现方式
    // 在 V8 源码里，thenable 的完成将放在 return 的 promise 的 thenable 中
    // 即：returnPromise.then(()=> thenable 完成)，且该步骤会添加在微任务队列中
    return Promise.resolve(4);
  })
  .then(res => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    setTimeout(() => {
      console.log('timeout 100 in Promise');
    }, 100);
  });

console.log('end');
