const handleServer = require('../index');

const http = require('http');

const PORT = 3000;

const server = http.createServer(handleServer);

server.listen(PORT, () => {
  console.log('listening on port ' + PORT)
});