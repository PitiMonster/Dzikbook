const mongoose = require('mongoose');

const acquaintanceSchema = mongoose.Schema({
  users: {
    type: Map,
    of: {
      type: 'ObjectId',
      ref: 'User',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Acquaintance = mongoose.model('Acquaintance', acquaintanceSchema);

module.exports = Acquaintance;
