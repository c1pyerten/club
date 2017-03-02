const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js')


// GET /profile
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    req.flash('message', 'Please Sign in!')
    return res.redirect('/signin')
  }
  
  const user = req.session.user
  console.log(user);
  const locals = {
    name: user.name
  }
  UserModel.findById(user.id, (err, user) => {
    if (err) return next(err)
    const locals = {
      following: user.following,
      follower: user.follower,
      replyCount: user.replyCount,
      postCount: user.postCount,
      signiture: user.signiture,
      email: user.email,
      url: user.url,
      bio: user.bio,
      avatar: user.avatar
    }
    res.render('user/profile', { user: user, title: user.name })
  })
})

// GET /settings
exports.get_settings = function (req, res) {
  if (!req.session.isLogin) {
    req.flash('message', 'Please signin')
    return res.redirect('/signin')
  }
  res.render('settings')
}

// POST /settings
exports.post_settings = function (req, res, next) {
  // TODO
  const settings = req.body
  UserModel.findByIdAndUpdate(req.session.user.id, settings)
  req.flash('message', 'Settings saved')
  res.redirect('/')
}

// GET /user/:username
exports.user = function (req, res, next) {
  const username = req.params.username
  UserModel.findOne({ username }, (err, user) => {
    if (err) return next(err)
    if (user === null) return res.render('404', {
      title: '404',
      username: req.session.isLogin ? req.session.user.username : ''
    })
    // TODO
    res.locals = {
      username: user.username,
    }
    res.render('user/user')
  })
}
