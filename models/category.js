const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Card-category', categorySchema);

module.exports = Category;
