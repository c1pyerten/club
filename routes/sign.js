const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const logger = require('log4js').getLogger()
const validator = require('validator')



// GET /signup
router.get('/signup', (req, res, next) => {
    logger.debug(req.body)
   
    res.render('sign/signup', {
        title: 'Signup'
    })
})

// POST /signup
router.post('/signup', (req, res, next) => {
    let { name, email, password } = req.body
    name = name.trim()
    email = email.trim()
    if (!validator.isEmail(email)) {
        res.json('Please input corret email.')
    }
    
    res.json(req.body)
    logger.debug(name, email, password)
    new UserModel({
        name,
        email,
        password
    }).save(err => {
        if (err) return logger.error('error in signup')
        logger.info(`${name} saved`)
        
        // send all json 
        UserModel.find((err, users) => {
            if (err) next(err)
            res.json(users.map(user => ({
                name: user.name,
                email: user.email,
                password: user.password
            })))
        })
    })

    // res.render('thank-you', {
    //     name,
    //     title: 'Success'
    // })
})

router.post('/signup/validate', (req, res, next) => {
    const name = req.query.name
    UserModel.find({ name }, (err, users) => {
        if (err) return next(err)
        if (users.length === 0) res.json(true)
        else res.json(false)
    })
})

module.exports = router