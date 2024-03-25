function fn(version1, version2) {
  const vArr1 = version1.split('.');
  const vArr2 = version2.split('.');

  const len1 = vArr1.length;
  const len2 = vArr2.length;
  const lenMax = Math.max(len1, len2);

  let i = 0;
  let j = 0;

  while (i < lenMax && j < lenMax) {
    const a = +vArr1[i];
    const b = +vArr2[j];
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      i++;
      j++;
    }
  }

  return 0;
}

console.log(fn('1.2.3', '1.2.1'));
console.log(fn('1.2.0.3', '1.2.1'));
console.log(fn('0.21.0.3', '1.2.1'));
console.log(fn('1.2.3', '1.2.3'));
