const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
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

UserSchema.pre('save', function (next) {
  // hash password here!!
  const user = this
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash password along with out new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

/**
 * Remove all cv that were created by the user given by _id
 */
UserSchema.pre('remove', function (next) {
  this.model('CV').deleteMany({ user: this._id }, next)
})

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
