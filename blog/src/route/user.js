const { login } = require('../controller/user');
const { set, get } = require('../db/redis');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');

const userRouterHandle = (req, res) => {
  const { method, path, body } = req;

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const result = login(body);
    return result.then(data =>  {
      const { username, realname, password, id } = data || {};
        if (id) {
          set(req.sessionId, { username, realname, password, id })
          return new SuccessMessage(id, '登录成功')
        }
        return new ErrorMessage('登录失败')
    })
  }

  // 登录
  // if (method === 'POST' && path === '/api/user/login') {
  //   const result = login(body);
  //   return result.then(data =>  {
  //     const info = data[0];
  //     if (info) {
  //       return new SuccessMessage(info?.id, '登录成功')
  //     }
  //       return new ErrorMessage('登录失败')
  //   }) 
  // }
}

module.exports = userRouterHandle;