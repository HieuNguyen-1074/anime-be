const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  isNew: {
    type: Boolean,
    required: true,
  },
});

const World = mongoose.model('world', WorldSchema);

module.exports = World;
