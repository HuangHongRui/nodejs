const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');
const { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog');

router.prefix('/api/blog')

router.get('/list', loginCheck, async (ctx) => {
  let { author, keyword, isadmin } = ctx.query;
  // 管理页面时
  if (isadmin) {
    author = ctx.session.username
  }
  const data = await getList(author, keyword);
  ctx.body = new SuccessMessage(data, '列表-请求')
})

router.get('/detail', async (ctx) => {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessMessage(data, '详情-请求')
})

router.post('/add', loginCheck, async (ctx) => {
  ctx.request.body.author = ctx.session.username;
  const data = await addBlog(ctx.request.body);
  ctx.body = new SuccessMessage(data, '新增-请求')
})

router.post('/update', loginCheck, async (ctx) => {
  ctx.request.body.author = ctx.session.username;
  const data = await updateBlog(ctx.request.body);
  if (data) {
    ctx.body = new SuccessMessage(data, '更新成功')
    return;
  }
  ctx.body = new ErrorMessage(data, '更新失败')
})

router.post('/delete', loginCheck, async (ctx) => {
  ctx.request.body.author = ctx.session.username;
  const data = await deleteBlog(ctx.request.body);
  if (data) {
    ctx.body = new SuccessMessage(data, '删除成功')
    return;
  }
  ctx.body = new ErrorMessage(data, '删除失败')
})

module.exports = router
