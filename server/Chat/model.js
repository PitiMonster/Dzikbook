const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Message must belong to the author!'],
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'read',
  },
});

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ['pair', 'group'],
    defualt: 'pair',
  },
  messages: [
    {
      type: messageSchema,
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
