module.exports = {
  checkLogIn: function (req, res, next) {
    if (req.session.user) return true
    else return false
  },

  checkLogOut: function (req, res, next) {
    if (req.session.user) return false
    else return true
  }
}