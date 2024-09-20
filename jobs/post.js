var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
const Category = require('../models/category');
// mod.cjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const getColors = require('get-image-colors');
const Emblem = require('../models/emblem');
const CardModel = require('../models/card');

const Jimp = require('jimp');
const Topic = require('../models/topic');
const Post = require('../models/post');
const { dataPost } = require('./dataPosts');

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

function makeRandomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
async function listAllFilesPosts() {
  try {
    const [files] = await admin.storage().bucket().getFiles({
      prefix: 'images/posts',
    });

    const topic = await Topic.find({});

    // console.log(files.length);
    files.forEach((image, index) => {
      const link = image.metadata.mediaLink;

      // console.log(emblems);

      // console.log(files[index].metadata);
      if (!image.metadata.name.split('/')[2]) return;
      const data = {
        name: dataPost[index].name,

        content: dataPost[index].content,
        mediaLink: link,
        shortDescription: dataPost[index].short,
        topicId: topic[parseInt(getRandomNumber(0, topic.length - 1))]._id,
        mediaType: image.metadata.contentType,
        col: 1,
      };
      Post.create(data);
      // console.log(
      //   categories.find(
      //     (category) =>
      //       files[index].metadata.name.indexOf(category.name) !== -1
      //   )
      // );
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

async function readColor(url) {
  try {
    const image = await Jimp.read(url);

    const color = Jimp.intToRGBA(image.getPixelColor(10, 10));
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  } catch (error) {
    return;
  }
}

module.exports = { listAllFilesPosts, readColor };
