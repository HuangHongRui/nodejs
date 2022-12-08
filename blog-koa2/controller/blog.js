const { exec } = require("../db/mysql")
const xss = require("xss");

const getList = async (author, keyword) => {
  let qsl = `select * from blog where 1=1 `
  if (author) {
    qsl += `and author='${author}' `
  }
  if (keyword) {
    qsl += `and content like '%${keyword}%' `
  }
  qsl += `order by createtime desc`
  return await exec(qsl);
}

const getDetail = async (id) => {
  let qsl = `select * from blog where id='${id}'`
  const data = await exec(qsl);
  return data[0];
}

const addBlog= async (reqBody) => {
  const { title, author, content } = reqBody;
  let qsl = `
    insert into blog (title, author, content, createtime)
    values('${xss(title)}', '${author}', '${xss(content)}', ${Date.now()})
  `
  const { insertId: id } = await exec(qsl);
  return { id }
}

const updateBlog = async (reqBody) => {
  const { id, title, content } = reqBody;
  const qsl = `update blog set title = '${xss(title)}', content = '${xss(content)}' where id = ${id}`
  const { affectedRows } = await exec(qsl);
  return affectedRows > 0;
}

const deleteBlog = async (reqBody) => {
  const { id, author } = reqBody;
  const sql = `delete from blog where id = ${id} and author = '${author}'`;
  const { affectedRows } = exec(sql);
  return affectedRows > 0;
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  deleteBlog
}