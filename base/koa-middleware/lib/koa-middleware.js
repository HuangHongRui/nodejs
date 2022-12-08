const http = require('http');

const compose = (middlewareList) => {
  return (ctx) => {
    const dispatch = (i) => {
      const fn = middlewareList[i]
      try {
        return Promise.resolve(
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    } 
    return dispatch(0)
  }
}

class KoaMiddleWare {
  constructor() {
    this.middlewareList = []
  }

  use(fn) {
    this.middlewareList.push(fn)
    return this
  }

  createContext = (req, res) => {
    const ctx = { req, res }
    ctx.query = req.query
    return ctx
  }

  handleRequest = (ctx, fn) => {
    return fn(ctx)
  }

  callback() {
    const fn = compose(this.middlewareList)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      this.handleRequest(ctx, fn)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args);
  }
}

module.exports = KoaMiddleWare;