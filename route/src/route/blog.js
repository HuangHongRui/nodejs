const blogRouteHandle = (req, res) => {
  const { method, path } = req;

  if (method === 'GET' && path === '/api/list') {
    return {
      msg: '请求成功：查看列表'
    }
  }

  if (method === 'GET' && path === '/api/detail') {
    return {
      msg: '请求成功：查看详情'
    }
  }

  if (method === 'POST' && path === '/api/add') {
    return {
      msg: '请求成功：新增'
    }
  }

  if (method === 'POST' && path === '/api/delete') {
    return {
      msg: '请求成功：删除'
    }
  }

  if (method === 'POST' && path === '/api/update') {
    return {
      msg: '请求成功：修改'
    }
  }

}

module.exports = blogRouteHandle;