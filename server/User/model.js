const mongoose = require('mongoose');
const slugify = require('slugify');

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
    validate: [validator.email, 'Please provide a valid email!'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
