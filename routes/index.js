const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users.js')
const signRouter = require('./sign.js')
const postRouter = requ

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.redirect('/posts')
});

module.exports = function router(app) {
  app.use('/', indexRouter)
  app.use('/users', userRouter)
  app.use('/', signRouter)
}
