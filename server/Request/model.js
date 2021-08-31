const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    validate: {
      validator: function (val) {
        return this.sender.toString() !== val;
      },
      message: 'You can not send request to yourself',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
