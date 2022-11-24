const userRouteHandle = (req, res) => {
  const { method, path } = req;

  if (method === 'POST' && path === '/api/login') {
    return {
      msg: '请求成功：登录接口'
    }
  }

}

module.exports = userRouteHandle;