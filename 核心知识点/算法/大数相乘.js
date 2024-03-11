function multiply(num1, num2) {
  const m = num1.length;
  const n = num2.length;
  const res = new Array(m + n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    const a = +num2[i];
    for (let j = m - 1; j >= 0; j--) {
      const b = +num1[j];

      const pos = i + j + 1;
      const multi = a * b + res[pos];
      res[pos] = multi % 10;
      res[pos - 1] += Math.floor(multi / 10);
    }
  }

  while (res[0] === 0) {
    res.splice(0, 1);
  }

  return res.length > 0 ? res.join('') : '0';
}
