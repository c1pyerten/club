const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: String,
  author: String,
  content: { type: String, default: '' },
  date: { type: Date, default: Date.now },

}) 

const ArticleModel = mongoose.model('article', articleSchema)

module.exports = ArticleModel
