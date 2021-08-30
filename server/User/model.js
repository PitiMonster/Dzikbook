const mongoose = require('mongoose');
const SHA256 = require('crypto-js/sha256');
const slugify = require('slugify');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
  },
  surname: {
    type: String,
    required: [true, 'User surname is required'],
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirm is required'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password confirmation differs from password',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    isNew: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
});

// encrypt the user's password with SHA256 algorithm
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = SHA256(this.password);
  this.passwordConfirm = undefined;
  next();
});

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password') || this.isNew) {
//     this.isNew = false;
//     return next();
//   }

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// check if user's password is equal provided password
userSchema.methods.correctPassword = (providedPassword, userPassword) =>
  SHA256(providedPassword) === userPassword;

// check if provided JWT was not generated before password change
userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
