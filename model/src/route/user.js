const userHandle = (req, res) => {
  const { method, path } = req;
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '登录-请求'
    }
  }
  
}

module.exports = userHandle;