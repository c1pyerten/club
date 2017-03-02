const UserModel = require('../models/user.js')
const config = require('../config.js')

exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user || !req.session.user.id) {
    return res.status(403).send('forbidden!')
  }
  next()
}