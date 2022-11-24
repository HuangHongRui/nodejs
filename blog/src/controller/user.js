const { exec, escape } = require('../db/mysql');

const login = (reqBody) => {
  const { username, password } = reqBody;
  const qsl = `select * from user where username = ${escape(username)} and password = ${escape(password)}`
  return exec(qsl).then(item => item[0])
}

module.exports = {
  login
}