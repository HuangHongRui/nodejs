const { ErrorMessage } = require('../model/resModel');

module.exports = async (rtx, next) => {
  if (rtx.session.username) {
    await next()
    return;
  }
  rtx.body = new ErrorMessage('未登录')
}