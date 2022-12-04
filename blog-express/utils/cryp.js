const crypto = require('crypto');

// 秘钥
const SECRET_KEY = 'Afxsa213_#1`fa*'
// MD5加密
const md5 = (content) => {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}
// 加密函数
const generatePassword = (password) => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

module.exports = {
  SECRET_KEY,
  generatePassword
}