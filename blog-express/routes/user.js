const express = require('express');
const router = express.Router();
const { login } = require('../controller/user');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');

router.post('/login', (req, res, next) => {
  const result = login(req.body);
  return result.then(data =>  {
    const { username, realname } = data || {};
    if (username) {
      req.session.username = username;
      req.session.realname = realname ;
      res.json(new SuccessMessage(username, '登录成功'))
      return;
    }
    res.json(new ErrorMessage('登录失败'))
  })
})

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: '已登录'
    })
    return
  }
  res.json({
    errno: -1,
    msg: '未登录'
  })
})

router.get('/session-test', (req, res, next) => {
  const session = req.session;
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  res.json({
    viewNum: session.viewNum,
    data: session
  })
})

module.exports = router;