const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /
router.get('/', (req, res, next) => {
  PostModel.find((err, posts) => {
    if (err) return next(err)
    // TODO finish page query
    const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    // TODO req.session.user
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

module.exports = router