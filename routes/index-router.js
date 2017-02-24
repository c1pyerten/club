const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /
router.get('/', (req, res, next) => {
  PostModel.find((err, posts) => {
    if (err) return next(err)
    // TODO finish page query
    const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    res.locals = {
      title: 'Club',
      user: req.session.user,
      message: req.flash('message'),
      posts: posts
    }
    res.render('index')
  })
})

router.get('/index', (req, res) => {
  res.redirect('/')
})



// GET /
module.exports = function (req, res, next) {
  PostModel.find((err, posts) => {
    if (err) return next(err)

    // TODO lazy load
    const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    res.locals = {
      title: 'Club',
      user: req.session.user,
      message: req.flash('message'),
      posts: posts
    }
    res.render('index')
  })
}