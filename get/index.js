const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const [path, query] = url.split('?')

  console.log('url: ', url)
  console.log('query: ', query)

  if (method === 'GET') {

    const data = {
      url,
      path,
      method,
      query: qs.parse(query),
    }

    res.end(JSON.stringify(data))
  }

})

server.listen(8080, () => {
  console.log('listening on port 8080')
})