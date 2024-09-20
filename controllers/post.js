const CardModel = require('../models/card');
const Category = require('../models/category');
const Post = require('../models/post');

/**
 * get Card by id
 */
const getPosts = async (req, res) => {
  const { topicId } = req.query;
  console.log(topicId, req.query);
  let posts;
  if (topicId !== 'all' && topicId) {
    posts = await Post.find({ topicId: topicId });
  } else {
    posts = await Post.find({});
  }

  res.status(200).json(posts);
};
const getPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.status(200).json(post);
};

module.exports = { getPosts, getPostById };
