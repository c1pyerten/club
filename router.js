const express = require('express')
const sign = require('./routes/sign.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')
const index = require('./routes/index.js')


const router = express.Router()

// /
router.get('/', index)
router.get('/index', index)

// /sign
router.get('/signin', sign.get_signin)
router.post('/sign', sign.post_signin)
router.get('/signup', sign.get_signup)
router.post('/signup', sign.post_signup)

// /user/:username
router.get('/user/:username', user.user)

// /settings
router.get('/settings', user.get_settings)
router.post('/settings', user.post_settings)

module.exports = router
