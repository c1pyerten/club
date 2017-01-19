const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /post
router.get('/post', (req, res, next) => {
  res.render('index')
})

// GET /post/create
router.get('/post/create', (req, res, next) => {
  if (!req.session.user) {
    req.session.flash = 'Please log in'
    return res.redirect('/login')
  }
  res.locals.title = 'create post'
  res.locals.user = req.session.user
  res.render('create')
})

// POST /post/create
router.post('/post/create', (req, res, next) => {
  const { title, content } = res.body
  const date = Date.now()
  const author = req.session.username

  new PostModel({ title, content, date, author })
    .save(err => {
      if (err) return next(err)
      // TODO /post/<new-post-here>
    })
  
})

// GET /post/:postId 
router.get('/post/:postId', (req, res, next) => {
  // TODO
  res.redirect('/')
})

module.exports = router

