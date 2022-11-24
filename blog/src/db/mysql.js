const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

// 创建
const con = mysql.createConnection(MYSQL_CONF);

// 连接
con.connect();

// 统一执行QSL的方法
const exec = (qsl) => {
  const promise = new Promise( (resolve, reject) => {
    con.query(qsl, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    })
  })
  return promise;
}

module.exports = {
  exec,
  // 防SQL注入
  escape: mysql.escape
}