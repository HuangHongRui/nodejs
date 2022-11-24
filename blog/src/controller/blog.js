const { exec } = require("../db/mysql")
const xss = require("xss");

const getList = (author, keyword) => {
  let qsl = `select * from blog where 1=1 `
  if (author) {
    qsl += `and author='${author}' `
  }
  if (keyword) {
    qsl += `and content like '%${keyword}%' `
  }
  qsl += `order by createtime desc`
  return exec(qsl);
}

const getDetail = (id) => {
  let qsl = `select * from blog where id='${id}'`
  return exec(qsl).then(data => data[0]);
}

const addBlog= (reqBody) => {
  const { title, author, content } = reqBody;
  let qsl = `
    insert into blog (title, author, content, createtime)
    values('${xss(title)}', '${author}', '${xss(content)}', ${Date.now()})
  `
  return exec(qsl).then(({ insertId: id }) => ({ id }))
}

const updateBlog = (reqBody) => {
  const { id, title, content } = reqBody;
  const qsl = `update blog set title = '${xss(title)}', content = '${xss(content)}' where id = ${id}`
  return exec(qsl).then(({ affectedRows }) => affectedRows > 0);
}

const deleteBlog = (reqBody) => {
  const { id, author } = reqBody;
  const sql = `delete from blog where id = ${id} and author = '${author}'`;
  return exec(sql).then(({ affectedRows }) => affectedRows > 0);
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  deleteBlog
}