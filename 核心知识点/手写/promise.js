class MyPromise {
  #STATE_PENDING = 'pending';
  #STATE_FULFILLED = 'fulfilled';
  #STATE_REJECTED = 'rejected';

  #state = this.#STATE_PENDING;
  #result = undefined;

  

  // 状态变更，pending => fulfilled/rejected
  #changeState(state, result) {
    if (this.#state !== this.#STATE_PENDING) return;
    this.#state = state;
    this.#result = result;
  }

  constructor(executor) {
    const resolve = data => this.#changeState(this.#STATE_FULFILLED, data);
    const reject = err => this.#changeState(this.#STATE_REJECTED, err);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if ((this.#state = this.#STATE_FULFILLED)) {
      }
    });
  }
}

const p = new MyPromise(resolve => {
  resolve(1);
});
p.then(
  res => {
    console.log('1 res: ', res);
  },
  err => {
    console.log('1 err: ', err);
  }
)
  .then(123, 321)
  .then(
    res => {
      console.log('2 res: ', res);
    },
    err => {
      console.log('2 err: ', err);
    }
  );
