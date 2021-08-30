const mongoose = require('mongoose');
const User = require('./../User/model');

const relationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Relation must have sender'],
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Relation must have receiver'],
      validate: {
        validator: function (val) {
          console.log(typeof val);
          console.log(typeof this.sender);
          return this.sender.toString() !== val.toString();
        },
        message: 'User can not be in relation to himself',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    status: {
      type: String,
      enum: ['sent', 'accepted', 'rejected', 'deleted'],
      default: 'sent',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

relationSchema.virtual('users').get(function () {
  return [this.sender, this.receiver];
});

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
