const qs = require('querystring');
const { set, get } = require('./src/db/redis');
const blogRouterHandle = require('./src/route/blog');
const userRouterHandle = require('./src/route/user');
const { getPostData, getCookieExpires  } = require('./src/utils');
const { access } = require('./src/utils/log');

const handleServer = (req, res) => {
  // 记录 ACCESS LOG
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式
  res.setHeader('Content-Type', 'application/json')

  // 获取 path / query
  const [path, query] = req.url.split('?');

  // 解析 query
  req.query = qs.parse(query);

  // 解析 path
  req.path = path;

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie;
  cookieStr?.split(';').forEach(item => {
    if (!item) return;
    const [k, v] = item.split('=');
    req.cookie[k.trim()] = v;
  })

  // 解析 session (redis)
  let needSetCookie = false;
  let { userid } = req.cookie;

  // 未登录
  if (!userid) {
    needSetCookie = true;
    userid = `${Date.now()}_${Math.random()}`;
    set(userid, {});
  }
  req.sessionId = userid;

  get(userid)
    .then(data => {
      const d = JSON.parse(data);
      if (d === null) {
        set(userid, {})
        req.session = {};
      } else {
        req.session = d;
      }
      return getPostData(req)
    })
    .then(postData => {
      req.body = postData;

      const userResult = userRouterHandle(req, res);
      if (userResult) {
        userResult.then(data => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userid}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(data));
        })
        return;
      }

      const blogResult = blogRouterHandle(req, res);
      if (blogResult) {
        blogResult.then(data => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userid}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(data));
        })
        return;
      }

      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('404 NOT FOUND');
      res.end();

    })
}

module.exports = handleServer;