const express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users.js')
const signRouter = require('./sign.js')

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.locals.message = req.session.flash
  res.locals.title = 'Index'

  res.render('index')
});

module.exports = function router(app) {
  app.use('/', indexRouter)
  app.use('/users', userRouter)
  app.use('/', signRouter)
}
