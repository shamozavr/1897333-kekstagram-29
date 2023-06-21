const lengthFN = (str, maxLength) => str.length <= maxLength;

const polyndromeCheck = (str) =>
  str.replace(/\s/g, '').toLowerCase() ===
  str.replace(/\s/g, '').toLowerCase().split('').reverse().join('');

const numExtract = (str) => str.toString().match(/\d+/g) === null ? NaN : Number(str.toString().match(/\d+/g).join(''));
lengthFN();
polyndromeCheck();
numExtract();
