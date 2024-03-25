function myPromiseAll(arr) {
  return new Promise((resolve, reject) => {
    const resArr = [];
    let finishedCount = 0;
    arr.forEach((task, i) => {
      Promise.resolve(task)
        .then(res => {
          resArr[i] = res;
          finishedCount++;
        })
        .catch(err => {
          reject(err);
          return;
        })
        .finally(() => {
          if (finishedCount === arr.length) {
            resolve(resArr);
            return;
          }
        });
    });
  });
}

myPromiseAll.then(resArr => {
  console.log('resArr: ', resArr);
});
