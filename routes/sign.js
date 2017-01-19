const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const logger = require('log4js').getLogger()
const validator = require('validator')

// const isLogin = require('../lib/isLogIn.js')


// GET /signup
router.get('/signup', (req, res, next) => {
  logger.debug(req.body)

  res.render('sign/signup', {
    title: 'Signup',
    user: req.session.user
  })
})

// POST /signup
router.post('/signup', (req, res, next) => {
  let { name, email, password } = req.body
  name = name.trim()
  email = email.trim()
  if (!validator.isEmail(email)) {
    return res.json('Please input corret email.')
  }

  logger.debug(name, email, password)
  new UserModel({
    name,
    email,
    password,
    
  }).save(err => {
    if (err) return next(err) // logger.error('error in signup')
    logger.info(`${name} saved`)

    req.session.flash = `Thank you ${name}, you have signed up`
    return res.redirect('/')
  })
})

router.post('/signup/validate', (req, res, next) => {
  const name = req.query.name
  UserModel.find({ name }, (err, users) => {
    if (err) return next(err)
    if (users.length === 0) res.json(true)
    else res.json(false)
  })
})

// GET /login
router.get('/login', (req, res, next) => {
  // TODO
  // if (req.session.user) return res.redirect('index')
  res.locals = {
    title: 'login page',
    user: req.session.user
  }

  res.render('login')
})

// POST /login
router.post('/login', (req, res, next) => {
  let { email, password } = req.body
  email = email.trim()
  password = password.trim()

  UserModel.find({ email }, (err, user) => {
    if (user.length === 0) {
      return res.json({ success: false, message: 'email not exist' })
    } 
    if (user.password !== password) {
      return res.json({ success: false, message: 'password incorrect' })
    }
    // TODO session
    req.session.user = true
    res.redirect('index', {
      flash: 'Log in successfully !'
    })
  })
})

module.exports = router