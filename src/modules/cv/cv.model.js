const mongoose = require('mongoose')
const validator = require('validator')

const CVSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    birthday: {
      type: String,
    },
    phone: {
      type: String,
      minlength: 9,
      maxlength: 10,
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address'],
      required: [true, 'Email is required'],
      unique: true,
    },
    ava: {
      type: String,
    },
    likeBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('CV', CVSchema)
