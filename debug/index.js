const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end('<h1>Hello, world!</h1>')
})

server.listen(3000, () => {
  console.log('listen on port 3000')
})