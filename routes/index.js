const express = require('express');

const indexRouter = require('./index-router.js')
const userRouter = require('./user.js')
const signRouter = require('./sign.js')
const postRouter = require('./post.js')


module.exports = function router(app) {
  // set flash to null
  // app.locals.message = null
  app.locals.message = null
  app.locals.user = null

  // fake user
  require('../models/user.js').findOne({ email: 'abc@d.cc' }, (err, user) => {
    if (err) return next(err)
    app.use(function (req, res, next) {
      req.session.user = user
      next()
    })
  })

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
    res.cookie('zxc', 'cookie-value')

    const UserModel = require('../models/user.js')
    const Mongoose = require('mongoose')
    new UserModel({})
    UserModel.findOne({email: 'abc@d.cc'}, (err, user) => {
      if (err) return next(err)
      res.send(user + JSON.stringify(req.cookies))
    })
  })

  app.get('/test/c', (req, res) => {
    res.send(req.cookies)
  })
}
