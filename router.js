const express = require('express')
const sign = require('./routes/sign.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')
const index = require('./routes/index-router.js')

const auth = require('./lib/auth.js')


const router = express.Router()

// /
router.get('/', index.index)
router.get('/index', index.index)

// /sign
router.get('/signin', sign.get_signin)
router.post('/signin', sign.post_signin)
router.get('/signup', sign.get_signup)
router.post('/signup', sign.post_signup)
router.post('/signup/validate', sign.validateUsername)
router.get('/logout', auth.userRequired, sign.logout)

// /post
router.get('/post/:id', post.postId)
router.get('/post/create', auth.userRequired, post.get_createPost)
router.post('/post/create', auth.userRequired, post.post_createPost)

// /user/:username
router.get('/user/:username', user.user)

// /settings
router.get('/settings', user.get_settings)
router.post('/settings', user.post_settings)

// /test
router.get('/test', auth.userRequired, (req, res) => {
  res.status(200).send('test passed')
})

// mock api
router.get('/api', (req, res) => {
  res.json({ success: true, message: 'zxcxzczxczxc' })
})

module.exports = router
