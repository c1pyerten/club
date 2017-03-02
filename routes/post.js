// const router = require('express').Router()
const PostModel = require('../models/post.js')
const ObjectId = require('mongoose').Types.ObjectId

// GET /post/create
exports.get_createPost = function (req, res, next) {
  // if (!req.session.isLogin) {
  //   req.flash('message', 'Please sign in before creating a post')
  //   return res.redirect('/signin')
  // }
  console.log('reach there');
  res.locals = {
    title: 'Create post',
    username: req.session.user.username
  }
  res.render('post/create')
}

// POST /post/create
exports.post_createPost = function (req, res, next) {
  let { title, content } = req.body
  title = title.trim()
  const author = req.session.user.username
  const date = new Date()
  
  new PostModel({
    title,
    content,
    author,
    createDate: date,
    updateDate: date,
  }).save(err => {
    if (err) return next(err)
    const url = `/post/${post.id}`
    return res.redirect(url)
  })
}

// GET /post/:postId
exports.postId = function (req, res, next) {
  const postId = req.params.postId
  PostModel.findById(ObjectId(postId), (err, post) => {
    if (err) return next(err)
    if (post === null) return res.render('404', {
      title: '404',
      username: req.session.isLogin ? req.session.user.username : ''
    })
    return res.send(post.id)

    post.visitCount++
    post.save(err => {
      if (err) return next(err)
      res.locals = {
        title: post.title,
        postTitle: post.title,
        content: post.content,
        username: post.author
      }
      // res.render('post/post')
      res.send(post.id)
    })
  })
}

// GET /post/:postId/delete
exports.delete = function (req, res, next) {
  
}