const { ErrorMessage } = require('../model/resModel');

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return;
  }
  res.json(
    new ErrorMessage('未登录')
  )
}