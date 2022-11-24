const getList = (author, keyword) => {
  return [
    {
      id: 0,
      title: '标题',
      content: 'ABC你好',
      author: 'leo',
      createTime: 1668676507671 
    },
    {
      id: 1,
      title: '标题',
      content: 'ABC你好',
      author: 'leo',
      createTime: 1668676516522
    },
  ]
}

const getDetail = (id) => {
  return {
    id: 0,
    title: '标题',
    content: 'ABC你好',
    author: 'leo',
    createTime: 1668676507671
  }
}

module.exports = {
  getList,
  getDetail
}