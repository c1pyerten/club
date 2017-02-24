const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const path = require('path')
const morgan = require('morgan')
const logger = require('log4js').getLogger()
const mongoose = require('mongoose')

const config = require('./config.js')
const router = require('./routes/index.js')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use('/bootstrap', express.static(path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/jquery', express.static(path.resolve(__dirname, 'node_modules', 'jquery', 'dist')))
app.use(morgan('dev'))
app.use(require('connect-flash')())
// http security
app.use(require('helmet')())
app.use(session({
  secret: config.session_secret,
  cookie: {
    maxAge: 14*24*60*60*1000
  },
  saveUninitialized: false,
  resave: true,
  // TODO 
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection
  // })
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cookie-parser')(config.session_secret))
// helmet middleware for security
app.use(require('helmet')())
app.set('port', 3000)

// connect mongo
mongoose.Promise = global.Promise
const db = mongoose.connection
mongoose.connect(config.mongo)
db.on('error', () => {
  logger.error('db connection err')
})
db.once('open', () => {
  logger.info(`db <${config.dbname}> connection success`)
})


router(app)

// 404
app.use((req, res, next) => {
  // const err = new Error('404 error')
  // err.status = 404
  // next(err)
  res.render('404', { title: '404'})
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