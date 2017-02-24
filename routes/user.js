const express = require('express');
const router = express.Router();

const UserModel = require('../models/user.js')


router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

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

// GET /profile/setting
router.get('/profile/setting', (req, res) => {
  if (!req.session.user) return next(err)
  // TODO
})

// GET user/:username
router.get('/user/:username', (req, res) => {
  const name = req.params.username
  UserModel.findOne({ name }, (err, user) => {
    if (err) return res.render('404')
    res.send("user found:" + user )
  })
})

module.exports = router;