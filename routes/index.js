const express = require('express');

const indexRouter = require('./index-router.js')
const userRouter = require('./users.js')
const signRouter = require('./sign.js')
const postRouter = require('./post.js')



module.exports = function router(app) {
  // set flash to null
  app.locals.flash = null
  app.use('/', indexRouter)
  app.use('/', userRouter)
  app.use('/', signRouter)
  app.use('/', postRouter)

  // test
  app.get('/test', (req, res, next) => {
    res.locals.posts = [1,2,3,4]
    res.locals.title = 'test title'
    res.locals.flash = 'no fuckiong message'
    res.locals.user = req.session.user

    res.render('index')
  })
}
