const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, 'data.txt');

// 读取文件内容
const read = () => {
  fs.readFile(filename, (err, data) => {
    if (err) return console.log(err)
    console.log(data.toString());
  })
}

// 写入文件
const write = () => {
  const content = 'what"s up. dodu \n'
  const opt = { flag: 'a' } // 追加写入
  fs.writeFile(filename, content, opt, err => {
    if (err) return console.log(err)
  })
}

// 判断文件是否存在
const exists = () => {
  if (fs.existsSync(filename)) {
    console.log('the file is exists')
  }
}

module.exports = {
  read,
  write,
  exists
}