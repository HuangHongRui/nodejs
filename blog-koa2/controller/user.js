const { exec, escape } = require('../db/mysql');
const { generatePassword } = require('../utils/cryp')

const login = async (reqBody) => {
  let { username, password } = reqBody;
  username = escape(username);
  password = generatePassword(password);
  password = escape(password);
  const qsl = `select * from user where username = ${username} and password = ${password}`
  const item = await exec(qsl);
  console.log(item, 'wtffff')
  return item[0];
}

module.exports = {
  login
}