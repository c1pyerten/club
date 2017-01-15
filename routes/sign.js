const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const logger = require('log4js').getLogger()



// GET /signup
router.get('/signup', (req, res, next) => {
    const { username, name, password, email } = req.body
    res.render('sign/signup', {
        title: 'Signup'
    })
})

// POST /signup
router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body
    logger.debug(name, email, password)

    
    res.render('thank-you', {
        name: name,
        title: 'Success'
    })
})

module.exports = router