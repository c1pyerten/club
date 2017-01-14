const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')


router.get('/signup', (req, res, next) => {
    const { username, name, password, email } = req.body
    res.render('sign/signup', {
        title: 'Signup'
    })

})

module.exports = router