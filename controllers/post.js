const CardModel = require('../models/card');
const Category = require('../models/category');
const Post = require('../models/post');

/**
 * get Card by id
 */
const getPosts = async (req, res) => {
  let posts = await Post.find({});

  res.status(200).json(posts);
};

module.exports = { getPosts };
