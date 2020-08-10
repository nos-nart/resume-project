const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema(
  {
    googleId: String,
    username: {
      type: String,
      required: [true, 'username is required!'],
      trim: true,
      minlength: 6,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, 'password is required!'],
      minlength: 6,
    },
    role: {
      type: String,
      default: 0,
    },
    cvCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CV',
      },
    ],
    cvLiked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CV',
      },
    ],
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next

  this.password = await bcrypt.hash(this.password, parseInt(SALT_WORK_FACTOR))
  next()
})

/**
 * Remove all cv that were created by the user given by _id
 */
UserSchema.pre('remove', function (next) {
  this.model('CV').deleteMany({ user: this._id }, next)
})

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.statics.checkExistingField = async (field, value) => {
  const checkField = await User.findOne({ [`${field}`]: value })
  return checkField
}

const User = mongoose.model('User', UserSchema)

module.exports = User
