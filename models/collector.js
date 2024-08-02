const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfowner: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const CollectionModel = mongoose.model('collector', itemSchema);

module.exports = CollectionModel;
