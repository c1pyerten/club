const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan')
const logger = require('log4js').getLogger()
const mongoose = require('mongoose')

const router = require('./routes/index.js')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('port', 3000)

// connect mongo
const connection = mongoose.



router(app)

// 404
app.use((req, res, next) => {
  const err = new Error('404 error')
  err.status = 404
  next(err)
})

// 500
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = app.get('env') === 'development' ? err: {}
  res.status(err.status || 500)
  res.render('error')
})


if (require.main === module) {
  app.listen(app.get('port') || 3000, () => {
    console.log(`app is listening ${app.get('port') || 3000}`);
  })
}


module.exports = app