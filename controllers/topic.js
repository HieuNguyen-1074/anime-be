const Post = require('../models/post');
const Topic = require('../models/topic');
const World = require('../models/world');

/**
 * get Card by id
 */
const getTopics = async (req, res) => {
  const { topicId } = req.query;
  let topics = await Topic.find({});
  let posts = await Post.find({});
  topics = topics.map((topic) => {
    console.log(topic._id);

    return {
      ...topic._doc,
      totalPost: posts.filter((post) => {
        //   console.log(post.topicId == topic._id, post.topicId, topic._id);
        return post.topicId == topic._id;
      }).length,
    };
  });

  res.status(200).json(topics);
};

module.exports = { getTopics };
