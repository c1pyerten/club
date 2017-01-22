const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /
router.get('/', (req, res, next) => {
  req.app.locals.flash = req.session.flash || null
  req.app.locals.title = req.session.title || 'Index page'
  req.app.locals.user = req.session.user || {}

  PostModel.find((err, posts) => {
    if (err) return next(err)
    // TODO finish page query
    const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    // TODO req.session.user
    res.locals.user = req.session.user
    res.render('index')
  })
})

router.get('/index', (req, res) => {
  res.redirect('/')
})

module.exports = router