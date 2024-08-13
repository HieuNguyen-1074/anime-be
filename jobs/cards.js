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
async function listAllFilesCards() {
  try {
    const [files] = await admin.storage().bucket().getFiles({
      prefix: 'images/cards',
    });

    const emblems = await Emblem.find({});
    const categories = await Category.find({});

    console.log(files.length);
    files.forEach((image, index) => {
      const link = image.metadata.mediaLink;

      // console.log(emblems);

      // console.log(files[index].metadata);
      readColor(link).then((color) => {
        const embId = [];
        for (
          let index = 0;
          index < Math.round(getRandomNumber(0, 10));
          index++
        ) {
          const element = emblems[Math.round(getRandomNumber(0, 32))];
          // console.log(emblems, element);
          if (!element) continue;

          embId.push(element._id);
        }

        if (!color) return;
        const data = {
          address: makeRandomString(40),
          emblemIds: embId,
          categoryId: categories.find(
            (category) =>
              files[index].metadata.name.indexOf(category.name)?._id || null
          ),
          name: `No. ${index}`,
          x: '',
          image: link,
          mainColor: color,
          isHighLight: index < 5,
          isWrapper: false,
        };
        CardModel.create(data);
        console.log(index);
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

async function readColor(url) {
  try {
    const image = await Jimp.read(url);

    const color = Jimp.intToRGBA(image.getPixelColor(10, 10));
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  } catch (error) {
    return;
  }
}

module.exports = { listAllFilesCards, readColor };
