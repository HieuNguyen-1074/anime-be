const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Benz = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  traits: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});

const BenzModel = mongoose.model('benz', Benz);

module.exports = BenzModel;
