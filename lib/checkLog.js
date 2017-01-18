module.exports = {
  checkLogIn: function (req, res, next) {
    if (req.cookies.login) {
      next()
    } else {
    }
  },

  checkLogOut: function (req, res, next) {
    if (req.session.isLogin)
  }
}