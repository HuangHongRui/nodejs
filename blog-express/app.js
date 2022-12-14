const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const redisClient = require('./db/redis');
const createError = require('http-errors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { SECRET_KEY } = require('./utils/cryp');
const RedisStore = require('connect-redis')(session);

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();
const ENV = process.env.NODE_ENV;

if (ENV !== 'production') {
  // https://github.com/expressjs/morgan
  app.use(logger('dev'));
} else {
  // 线上
  const logFileName = path.join(__dirname, 'log', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(logger('combined', {
    stream: writeStream
  }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session 插件引用
app.use(
  session({
    secret: SECRET_KEY,
    cookie: {
      // path: '/',    // 默认
      // http: 'only', // 默认
      maxAge: 24 * 60 * 60 * 1000
    },
    store: new RedisStore({ client: redisClient })
  })
)

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
