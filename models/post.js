const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mediaLink: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  topicId: {
    type: String,
    require: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now(),
  },
  col: {
    type: Number,
    require: true,
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
