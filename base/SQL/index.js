const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hr138',
  port: 3306,
  database: 'myblog'
})

con.connect();


// const sql = 'select * from user'; // 查
// const sql = `update user set realname = '托尼老师' where username = 'tony' `; // 改
const sql = `insert into blog (title, content, author, createtime) value ('标题2', '内容2', 'leo', 1668848858779)`; // 增
con.query(sql, (err, res) => {
  if (err) return;
  console.log(res);
})

con.end()
