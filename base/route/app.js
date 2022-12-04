// env: process.env.NODE_ENV
const blogRouteHandler = require('./src/route/blog');
const userRouteHandler = require('./src/route/user');

const serverHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const [path, query] = req.url.split('?')
  req.path = path;
  req.query = query;

  const blogData = blogRouteHandler(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = userRouteHandler(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404 Not Found');
  res.end();
}

module.exports = serverHandler;