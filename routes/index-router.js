const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /
router.get('/', (req, res, next) => {
  PostModel.find((err, posts) => {
    if (err) return next(err)
    // TODO finish page query
    const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    res.locals.title = 'Index title'
    res.locals.message = 'messagesssssssss'
    // TODO res.session.user
    res.locals.user = null
    res.render('index')
  })
})

module.exports = router