// 标准输出
// example: 1
// process.stdin.pipe(process.stdout);

// example: 2
// const http = require('http');
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)
//   }
// })
// server.listen(3000)

// example: 3
const bigCopyPipe = () => {
  const fs = require('fs');
  const path = require('path');

  const file1 = path.resolve(__dirname, 'file1.txt')
  const file2 = path.resolve(__dirname, 'file2.txt')

  const readFile = fs.createReadStream(file1);
  const writeFile = fs.createWriteStream(file2);

  readFile.pipe(writeFile)

  readFile.on('data', chunk => {
    console.log('chunk => ', chunk.toString());
  })

  readFile.on('end', () => {
    console.log('copy done')
  })
}

// example: 4 网络IO 结合 文件IO
const getFileTxt = () => {
  const http = require('http');
  const fs = require('fs');
  const path = require('path');

  const file = path.resolve(__dirname, 'file1.txt');
  
  const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
      const readFile = fs.createReadStream(file);
      readFile.pipe(res);
    }
  })

  server.listen(3000)
}

getFileTxt()

module.exports = {
  bigCopyPipe,
  getFileTxt
}