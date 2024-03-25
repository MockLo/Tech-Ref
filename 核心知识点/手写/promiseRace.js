function myPromiseRace(arr) {
  return new Promise((resolve, reject) => {
    arr.forEach(task => {
      Promise.resolve(task)
        .then(res => {
          resolve(res);
          return;
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
