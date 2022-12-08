const router = require('koa-router')()
const { login } = require('../controller/user');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');

router.prefix('/api/user');


router.post('/login', async (ctx, next) => {
  const data = await login(ctx.request.body);
  console.log(data, 'wtf')
  const { username, realname } = data || {};
  if (username) {
    ctx.session.username = username;
    ctx.session.realname = realname;
    ctx.body = new SuccessMessage(username, '登录成功')
    return;
  }
  ctx.body = new ErrorMessage('登录失败')
})

router.get('/login-test', async (ctx, next) => {
  if (ctx.session.username) {
    ctx.body = { errno: 0, msg: '已登录' }
    return
  }
  ctx.body = { errno: -1, msg: '未登录' }
})

router.get('/session-test', async (ctx, next) => {
  const session = ctx.session;
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  ctx.body = {
    viewNum: session.viewNum,
    data: session
  }
})

module.exports = router
