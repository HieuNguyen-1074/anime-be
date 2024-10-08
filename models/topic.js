const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;
