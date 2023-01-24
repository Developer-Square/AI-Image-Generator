const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostModel = mongoose.model('Post', Post);

module.exports = PostModel;
