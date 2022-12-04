const { exec, escape } = require('../db/mysql');
const { generatePassword } = require('../utils/cryp')

const login = (reqBody) => {
  let { username, password } = reqBody;
  username = escape(username);
  password = generatePassword(password);
  password = escape(password);
  const qsl = `select * from user where username = ${username} and password = ${password}`
  return exec(qsl).then(item => item[0])
}

module.exports = {
  login
}