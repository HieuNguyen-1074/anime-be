const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  emblemIds: {
    type: Schema.Types.Array,
    required: true,
    ref: 'Category', // Assuming you have a Category model
  },
  name: {
    type: String,
    required: true,
  },
  x: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  mainColor: {
    type: String,
    required: false,
  },
  categoryId: {
    type: String,
    required: false,
  },
  isWrapper: {
    type: Boolean,
    required: true,
  },
  isHighLight: {
    type: Boolean,
    required: true,
  },
});

const CardModel = mongoose.model('card', Card);

module.exports = CardModel;
