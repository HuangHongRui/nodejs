const fs = require('fs');
const path = require('path');
const readLine = require('readline')

const fileName = path.join(__dirname, '../../', 'log', 'access.log');
const readStream = fs.createReadStream(fileName);

const rl = readLine.createInterface({
  input: readStream
})

// 总行
let sum = 0;
// chrome 总行
let chromeNum = 0;

rl.on('line', (data) => {
  if (!data) return;
  sum++
  const arr = data.split(' -- ');
  if (arr[2]?.indexOf('Chrome') > 0) {
    chromeNum++
  }
})

// 监听读取完成
rl.on('close', () => {
  console.log(chromeNum, sum, 'Chrome 占比' + chromeNum / sum);
})