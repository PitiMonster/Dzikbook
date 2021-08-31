const mongoose = require('mongoose');
const User = require('./../User/model');

const relationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      validate: {
        validator: function (val) {
          console.log(typeof val);
          console.log(typeof this.sender);
          return this.sender.toString() !== val.toString();
        },
        message: 'User can not be in relation to himself',
      },
    },
    users: {
      type: Map,
      of: {
        type: 'ObjectId',
        ref: 'User',
      },
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    status: {
      type: String,
      enum: ['sent', 'accepted', 'deleted'],
      default: 'sent',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

relationSchema.post('save', function (doc, next) {
  if (doc.receiver && doc.sender) {
    doc.users.set('sender', doc.sender);
    doc.users.set('receiver', doc.receiver);
    doc.sender = undefined;
    doc.receiver = undefined;
    doc.save({ validateBeforeSave: false });
  }
  next();
});

relationSchema.methods.isPermittedToUpdate = function (user) {
  console.log(typeof this.status);
  if (this.status === 'sent') {
    return user.toString() === this.users.get('receiver').toString();
  } else {
    return Object.values(this.users).some(
      (el) => el.toString() === user.toString()
    );
  }
};

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
