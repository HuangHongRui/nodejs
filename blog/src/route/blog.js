const { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');

// 登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorMessage('未登录'))
  } 
  return true
}

const blogRouterHandle = (req, res) => {
  const { method, path, query = {}, body } = req;
  const { id, author, keyword } = query

  if (method === 'GET' && path === '/api/blog/list') {
    const result = getList(author, keyword);
    return result.then(data =>  new SuccessMessage(data, '列表-请求'));
  }
  
  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then(data => new SuccessMessage(data, '详情-请求'));
  }

  if (method === 'POST' && path === '/api/blog/add') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    body.author = req.session.username;
    const result = addBlog(body);
    return result.then(data => new SuccessMessage(data, '新增-请求'));
  }

  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    body.author = req.session.username;
    const result = updateBlog(body);
    return result.then(data => {
      if (data) {
        return new SuccessMessage(data, '更新成功')
      }
        return new SuccessMessage(data, '更新失败')
    });
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    body.author = req.session.username;
    const result = deleteBlog(body);
    return result.then(data => {
      if (data) {
        return new SuccessMessage(data, '删除成功')
      }
        return new ErrorMessage(data, '删除失败')
    });
  }
}

module.exports = blogRouterHandle;