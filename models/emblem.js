const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmblemSchema = mongoose.Schema({
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
  isMutil: {
    type: Boolean,
    required: true,
  },
  isNew: {
    type: Boolean,
    required: true,
  },
});

const Emblem = mongoose.model('Emblem', EmblemSchema);

module.exports = Emblem;
