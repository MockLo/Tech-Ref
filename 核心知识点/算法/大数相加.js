function bigSum(num1, num2) {
  const lenMax = Math.max(num1.length, num2.length);
  const str1 = num1.padStart(lenMax, '0');
  const str2 = num2.padStart(lenMax, '0');

  let add = 0;
  let resStr = '';

  for (let i = lenMax - 1; i >= 0; i--) {
    const a = +str1[i] || 0;
    const b = +str2[i] || 0;
    const sum = a + b + add;
    add = 0;
    if (sum > 9) {
      add = 1;
    }
    resStr = `${sum % 10}${resStr}`;
  }

  return add === 0 ? resStr : `1${resStr}`;
}

console.log(bigSum('12345678998765432', '123'));
