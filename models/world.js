const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = mongoose.Schema({
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

const CardModel = mongoose.model('card', Card);

module.exports = CardModel;
