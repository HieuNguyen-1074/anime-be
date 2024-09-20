var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
const Emblem = require('../models/emblem');
const Topic = require('../models/topic');

const nameOfCategories = [
  'Collaborations',
  'Collectibles',
  'Contents',
  'Events',
  'Teachnology',
];

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

async function listAllFilesTopic() {
  try {
    nameOfCategories.forEach((name, index) => {
      // console.log(files[index].metadata.contentType);
      Topic.create({
        name: name,
      });
    });
  } catch (error) {
    if (error.code === 404) {
      console.error(
        'Error: Bucket not found. Please check the bucket name and ensure it exists.'
      );
    } else if (error.code === 'permission-denied') {
      console.error(
        'Error: Permission denied. Please check the service account permissions.'
      );
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
module.exports = { listAllFilesTopic };
