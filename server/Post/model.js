const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must belong to the user'],
  },
  text: {
    type: String,
  },
  type: {
    type: String,
    default: 'public',
    enum: ['private', 'friends', 'public'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  images: [String],
});

postSchema.methods.isAuthor = function (userId) {
  return userId === this.author;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
