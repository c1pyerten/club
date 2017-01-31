const router = require('express').Router()
const PostModel = require('../models/post.js')
const ObjectId = require('mongoose').Types.ObjectId

// GET /post
router.get('/post', (req, res, next) => {
  res.render('index')
})

// GET /post/create
router.get('/post/create', (req, res, next) => {
  if (!req.session.user) {
    req.flash('message', 'Please sign in before create a post')
    return res.redirect('/signin')
  }
  res.locals = {
    title: 'create posts',
    user
  }
  // res.locals.user = req.session.user
  res.render('post/create')
})

// POST /post/create
router.post('/post/create', (req, res, next) => {
  // TODO add temporary save module
  const { title, content } = req.body
  console.log(title, content);
  const date = Date.now()
  const author = req.session.user.name

  new PostModel({ title, content, date, author })
    .save((err, post) => {
      if (err) return next(err)
      // TODO /post/<new-post-here>
      const url = `/post/${post.id}`
      console.log(url);
      return res.redirect(url)
    })
})

// GET /post/:postId 
router.get('/post/:postId', (req, res, next) => {
  const postId = req.params.postId
  PostModel.findById(ObjectId(postId), (err, post) => {
    if (err) return next(err)
    if (post == null) return res.render('404')
    // TODO
    post.visitCount++;
    post.save(err => {
      if (err) return next(err)
      res.locals = {
        title: post.title,
        postTitle: post.title,
        content: post.content,
        user: req.session.user
      }
      res.render('post/post')
    })
  })
})

module.exports = router