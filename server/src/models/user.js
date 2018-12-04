const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  userWants: {
    type: Array,
    required: true
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
