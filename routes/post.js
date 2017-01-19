const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /post
router.get('/post', (req, res, next) => {
  res.render('index')
})

// GET /post/create
router.get('/post/create', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/login')
  }
  res.render('post/create')
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
  PostModel.find({ })
})

module.exports = router

