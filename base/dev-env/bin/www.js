const http = require('http');
const serverHandler = require('../app');

const server = http.createServer(serverHandler);

server.listen(3000, () => {
  console.log('listening on port 3000')
})