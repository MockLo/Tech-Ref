async function request(url, retry = 3, timeout = 1000) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    const _req = () => {
      let status = 'pending';
      const fm = fetch(url);
      const timer = setTimeout(() => {
        if (status === 'pending') {
          reject(new Error('超时了 xxxxxx'));
        }
      }, timeout);

      fm.then(res => {
        clearTimeout(timer);
        status = 'fulfilled';
        resolve(res);
      }).catch(err => {
        clearTimeout(timer);
        status = 'rejected';
        if (retryCount >= retry) {
          reject(err);
        } else {
          retryCount++;
          _req();
        }
      });
    };

    _req();
  });
}

request('https://jsonplaceholder.typicode.com/todos/1').then(res=>console.log('1', res)).catch(err=>console.log('2', err));
