const express = require('express');

const indexRouter = require('./index-router.js')
const userRouter = require('./users.js')
const signRouter = require('./sign.js')
const postRouter = require('./post.js')



module.exports = function router(app) {
  app.use('/', indexRouter)
  app.use('/', userRouter)
  app.use('/', signRouter)
  app.use('/', postRouter)

  // test
  app.get('/test', (req, res, next) => {
    res.locals.posts = [1,2,3,4]
    res.locals.title = 'test title'
    res.locals.message = 'no fuckiong message'
    res.render('index')
  })
}
