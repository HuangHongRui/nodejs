const userHandle = require('./src/route/user')
const blogHandle = require('./src/route/blog')

const handleServer = (req, res) => { 
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let resData;
  const { url } = req;
  const [path, query] = url.split('?');
  req.path = path;
  req.query = query;

  resData = userHandle(req, res);
  if (resData) {
    res.end(JSON.stringify(resData));
    return;
  }
  resData = blogHandle(req, res);
  if (resData) {
    res.end(JSON.stringify(resData));
    return;
  }
  
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404 NOT FOUND');
  res.end();
}

module.exports = handleServer;