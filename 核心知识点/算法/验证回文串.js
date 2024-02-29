function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;

  while (i <= j) {
    const a = str[i]; // 如果忽略大小写的话，就使用 toLowerCase/toUpperCase
    const b = str[j];

    if (a !== b) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}

console.log(isPalindrome('aba'));
console.log(isPalindrome('abba'));
console.log(isPalindrome('abcdba'));
