const http = require('http');

const server = http.createServer((req, res) => {
  const { method, headers } = req;
  if (method === 'POST') {

    // DATA TYPE
    console.log('CONTENT-TYPE', headers['content-type']);

    // chunk TYPE/二进制
    let postData = '';
    req.on('data', chunk => {
      console.log('DATA: ', chunk)
      postData += chunk.toString()
    });

    req.on('end', () => {
      console.log('POSTDATA: ', postData)
      res.end('hello world')
    });
  }
})

server.listen(8080, () => {
  console.log('listening on port 8080');
})