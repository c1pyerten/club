const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const logger = require('log4js').getLogger()
const validator = require('validator')

// const isSignin = require('../lib/isSignin.js')

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

    // req.session.flash = `Thank you ${name}, you have signed up`
    req.flash('message', `Thank you ${name}, you have signed up`)
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

// GET /signin
router.get('/signin', (req, res, next) => {
  if (req.session.user) {
    // TODO add flash message
    // req.session.flash = 'You have signed in!'
    req.flash('message', 'You have signed in')
    res.redirect('/')
  }
  res.locals = {
    title: 'signin page',
    message: req.flash('message')
  }

  res.render('sign/signin')
})

// POST /sign
router.post('/signin', (req, res, next) => {
  let { email, password } = req.body
  email = email.trim()
  password = password.trim()

  UserModel.findOne({ email }, (err, user) => {
    if (user == null) {
      return res.json({ success: false, message: 'email not exist' })
    } 
    if (user.password !== password ) {
      return res.json({ success: false, message: 'password incorrect' })
    }
    req.session.user = {
      name: user.name,
      id: user.id
    }
    res.json({ success: true, message: 'Sign in successfully!' })
  })
})

router.get('/signout', (req, res, next) => {
  req.session.user = null
  res.redirect('back')
})

module.exports = router