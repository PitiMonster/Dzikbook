const mongoose = require('mongoose');

const acquaintanceSchema = mongoose.Schema({
  friend: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Acquaintance must contain friend'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  chat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chat',
    required: [true, 'Acquaintance must contain chat'],
  },
});

const Acquaintance = mongoose.model('Acquaintance', acquaintanceSchema);

module.exports = Acquaintance;
