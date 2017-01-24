const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    username: { type: String, default: 'default username' },
    password: String,
    email: String,
    url: { type: String },
    signiture: { type: String, default: '' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },

    postCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel