const mongoose = require('mongoose');

const relationSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Relation must have sender'],
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Relation must have receiver'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  type: {
    type: String,
    enum: ['sent', 'accepted', 'rejected', 'deleted'],
    default: 'sent',
  },
});

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
