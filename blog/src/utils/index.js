const crypto = require('crypto');

// 方法-过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

// 对请求参数进行处理
const getPostData = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    let postData = '';

    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  });
  return promise;
}

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
  getCookieExpires,
  getPostData,
  generatePassword
}