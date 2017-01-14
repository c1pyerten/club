const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users.js')
const signRouter = require('./sign.js')

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = function router(app) {
  app.use('/', indexRouter)
  app.use('/users', userRouter)
  app.use('/', signRouter)
}
