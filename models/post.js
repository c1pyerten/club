const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  content: { type: String, default: '' },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },

  replyCount: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastReplyDate: { type: Date, default: null }
}) 

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel
