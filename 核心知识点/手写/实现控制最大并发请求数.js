const getUrl = i => `https://jsonplaceholder.typicode.com/todos/${i}`;

const urls = (() => new Array(20).fill('').map((_, i) => getUrl(i + 1)))();

const doReq = function (url) {
  console.log('开始请求，url: ', url);

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        console.log('请求结束，url: ', url);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const maxConcurrencyRequest = function (urls, limit = 5) {
  return new Promise(resolve => {
    const resArr = [];
    const n = Math.min(urls.length, limit);

    let nextP = n - 1;

    const _request = function (index) {
      if (index >= urls.length) {
        resolve(resArr);
        return;
      }

      const url = urls[index];
      doReq(url)
        .then(res => {
          resArr[index] = res;
        })
        .catch(err => {
          resArr[index] = err;
        })
        .finally(() => {
          nextP++;
          _request(nextP);
        });
    };

    for (let i = 0; i < n; i++) {
      _request(i);
    }
  });
};

maxConcurrencyRequest(urls).then(res => {
  console.log('全部请求结束', res);
});
