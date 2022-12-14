const fs = require('fs');
const path = require('path');

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n')
}

// 生成 Write Stream
const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, '../../', 'log', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream;
}

// // 访问日志
const accessWriteStream = createWriteStream('access.log')
const access = (log) => writeLog(accessWriteStream, log)

// 错误日志
const errorWriteStream = createWriteStream('error.log')
const error = (log) => writeLog(errorWriteStream, log)

// 自定义日志
const eventWriteStream = createWriteStream('event.log')
const event = (log) => writeLog(eventWriteStream, log)


module.exports = {
  access, error, event
}