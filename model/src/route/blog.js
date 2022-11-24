const { getList, getDetail } = require('../controller/blog');
const { SuccessMessage, ErrorMessage } = require('../model/resModel');

const blogHandle = (req, res) => {
  const { method, path, query } = req;
  const { id, author, keyword } = query


  if (method === 'GET' && path === '/api/blog/list') {
    const listData = getList(author, keyword);
    return new SuccessMessage(listData, '列表-请求')
  }
  
  if (method === 'GET' && path === '/api/blog/detail') {
    const listData = getDetail(id);
    return new SuccessMessage(listData, '详情-请求')
  }

}

module.exports = blogHandle;