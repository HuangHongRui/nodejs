const express = require('express');

// 实例
const app = express();

app.use((req, res, next) => {
  console.log('请求开始..', req.method, req.url);
  next();
})

app.use((req, res, next) => {
  // 处理cookie
  req.cookie = {
    userid: '123'
  }
  next()
})

app.use((req, res, next) => {
  // 异步处理post-data
  setTimeout(() => {
    req.body = {
      a: 1,
      b:2
    }
    next()
  }, 500)
})

app.use('/api', (req, res, next) => {
  console.log('处理API路由')
  next();
})

app.get('/api', (req, res, next) => {
  console.log('get API路由')
  next();
})

app.post('/api', (req, res, next) => {
  console.log('post API路由')
  next();
})

app.get('/api/dd', (req, res, next) => {
  console.log('get adsf')
  res.json({
    erron: 0,
    data: req.cookie
  })
})

app.post('/api/dd', (req, res, next) => {
  console.log('postt / api-get-data', 123)
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理404')
  res.json({
    errno: -1,
    msg: '404 not fount'
  })
})

app.listen(3000, () => console.log('listen 3000'))