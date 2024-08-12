var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
const Category = require('../models/category');
// mod.cjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const getColors = require('get-image-colors');
const Emblem = require('../models/emblem');
const CardModel = require('../models/card');

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
    const embId = [];
    // console.log(emblems);
    for (let index = 0; index < Math.round(getRandomNumber(0, 33)); index++) {
      const element = emblems[Math.round(getRandomNumber(0, 33))];
      console.log(getRandomNumber(0, 33));
      embId.push(element._id);
    }

    console.log(files.length);
    files.forEach((image, index) => {
      const link = image.metadata.mediaLink;
      // console.log(files[index].metadata);
      readColor(link, image.metadata.contentType).then((color) => {
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

async function readColor(url, imageType) {
  try {
    console.log(imageType);
    let fimg = await fetch(url);

    let buffer = Buffer.from(await fimg.arrayBuffer());
    // console.log(fimg.name);
    let colors = await getColors(buffer, imageType);
    return colors[0].hex();
  } catch (error) {
    return '#ffff';
  }
}

module.exports = { listAllFilesCards, readColor };
