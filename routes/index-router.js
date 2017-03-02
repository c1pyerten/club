// const router = require('express').Router()
const PostModel = require('../models/post.js')

// GET /
exports.index = function (req, res, next) {
  PostModel.find((err, posts) => {
    if (err) return next(err)
    // const page = req.query.page
    res.locals.posts = posts.slice(0, 10)
    res.locals = {
      posts,
      title: 'club',
      username: req.session.isLogin ? req.session.user.username : '',
      message: req.flash('message')
    }
    res.render('index')
  })
}


// GET /
// module.exports = function (req, res, next) {
//   PostModel.find((err, posts) => {
//     if (err) return next(err)

//     // TODO lazy load
//     const page = req.query.page
//     res.locals.posts = posts.slice(0, 10)
//     res.locals = {
//       title: 'Club',
//       user: req.session.user,
//       message: req.flash('message'),
//       posts: posts
//     }
//     res.render('index')
//   })
// }