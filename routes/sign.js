const express = require('express')
// const router = express.Router()
const UserModel = require('../models/user.js')
const logger = require('log4js').getLogger()
const validator = require('validator')

// const isSignin = require('../lib/isSignin.js')


// GET /signup
exports.get_signin = function (req, res, next) {
  // logger.debug(req.body)

  res.render('sign/signup', {
    title: 'Signup',
    username: req.session.user.username
  })
}

exports.post_signup = function (req, res, next) {
  let { username, email, password } = req.body
  username = username.trim()
  email = email.trim()
  password = password.trim()
  if (!validator.isEmail(email)) {
    return res.json('Please enter correct email format!')
  }

  UserModel.findOne({ email }, (err, user) => {
    if (user !== null) return res.json({ success: false, message: 'Email has been used!' })
    new UserModel({
      username,
      password,
      email
    }).save(err => {
      if (err) return next(err)
      logger.info(`${username} saved`)
      req.flash('message', `Thank you ${name}, you have signed up`)
      return res.redirect('/')
    })
  })
    
}

// POST /signup/validate?name=
exports.validateUsername = function (req, res) {
  const username = req.query.name
  UserModel.findOne({ username }, (err, user) => {
    if (err) return next(err)
    if (user === null) res.json(true)
    else res.json(false)
  })
}


// GET /signin
exports.get_signup = function (req, res, next) {
  if (req.session.isLogin) {
    req.flash('message', 'You have already signed in')
    res.redirect('/')
  }
  res.locals = {
    title: 'Signin'
  }
  res.render('sign/signin')
}

// POST /signin
exports.post_signin = function (req, res, next) {
  let { email, password } = req.body
  email = email.trim()
  password = password.trim()

  UserModel.findOne({ email }, (err, user) => {
    if (err) return res.render('error')
    if (user == null) {
      return res.json({ success: false, message: '用户未注册' })
    } else if (user.password !== password) {
      return res.json({ success: false, message: 'Password wrong' })
    } 

    req.session.user = user
    req.session.isLogin = true
    res.json({ success: true, message: 'Sign in successfully!' })
  })
}

// GET /signout
exports.signout = function (req, res) {
  req.session.destroy(function () {
    res.clearCookie('user', {})
    res.cookie('isLogin', false)
    res.redirect('back')
  })
}
