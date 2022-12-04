const express = require('express');
const router = express.Router();
const { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.get('/list', loginCheck, (req, res ) => {
  let { author, keyword, isadmin } = req.query;
  // 管理页面时
  if (isadmin) {
    author = req.session.username
  }
  const result = getList(author, keyword);
  return result.then(data => {
    res.json(new SuccessMessage(data, '列表-请求'));
  });
})

router.get('/detail', (req, res ) => {
  const result = getDetail(req.query.id);
  result.then(data => 
    res.json(
      new SuccessMessage(data, '详情-请求')
    )
  );
})

router.post('/add', loginCheck, (req, res ) => {
  req.body.author = req.session.username;
  const result = addBlog(req.body);
  return result.then(data => res.json(new SuccessMessage(data, '新增-请求')));
})

router.post('/update', loginCheck, (req, res ) => {
  req.body.author = req.session.username;
  const result = updateBlog(req.body);
  return result.then(data => {
    if (data) {
      res.json(new SuccessMessage(data, '更新成功'));
      return;
    }
    res.json(new ErrorMessage(data, '更新失败'));
  });
})

router.post('/delete', loginCheck, (req, res ) => {
  req.body.author = req.session.username;
  const result = deleteBlog(req.body);
  return result.then(data => {
    if (data) {
      res.json(new SuccessMessage(data, '删除成功'));
      return;
    }
      res.json(new ErrorMessage(data, '删除失败'));
  });
})

module.exports = router;