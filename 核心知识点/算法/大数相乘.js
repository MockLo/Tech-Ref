function bigMulti(num1, num2) {
  const lenMax = Math.max(num1.length, num2.length);

  const pos = new Array(lenMax * 2).fill(0);
  let posIndex = pos.length - 1;

  for (let i = num2.length - 1; i >= 0; i--) {
    const a = +num2[i];
    for (let j = num1.length - 1; j >= 0; j--) {
      const b = +num1[j];
      const m = a * b + pos[posIndex];
      pos[posIndex] = m % 10;
      pos[posIndex - 1] += Math.floor(m / 10);
      posIndex--;
    }
    posIndex = posIndex + lenMax - 1;
  }

  console.log('pos: ', pos);

  while (pos[0] === 0) {
    pos.splice(0, 1);
  }

  return pos.join('');
}

console.log('bigMulti(123, 45)', bigMulti('123', '45'));
