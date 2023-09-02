const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, 'Please provide Email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide Valid Email',
    },
  },
  password: {
    type: String,
    require: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

module.export = mongoose.model('User', UserSchema)
