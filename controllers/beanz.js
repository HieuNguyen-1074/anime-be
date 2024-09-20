const BenzModel = require('../models/beanz');
const Post = require('../models/post');

/**
 * get Card by id
 */
const getBenzs = async (req, res) => {
  let benzs = await BenzModel.find({});

  res.status(200).json(benzs);
};

const getBenzsPost = async (req, res) => {
  let benzsPost = await Post.find({}).limit(5).skip(10);

  res.status(200).json(benzsPost);
};

module.exports = { getBenzs, getBenzsPost };
