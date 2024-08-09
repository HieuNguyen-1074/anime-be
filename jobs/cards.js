var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
const Category = require('../models/category');
// mod.cjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const getColors = require('get-image-colors');
const Emblem = require('../models/emblem');

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
    // const embId = [];
    // for (let index = 0; index < getRandomNumber(0, 33); index++) {
    //   const element = emblems[getRandomNumber(0, 33)];
    //   embId.push(element._id);
    // }

    files.forEach((image, index) => {
      console.log(files[index].metadata.name);
      // const link = image.metadata.mediaLink;
      //   console.log(files[index].metadata);
      //   address: makeRandomString(40),
      //   emblemIds:embId,
      //   categoryId :
      //   name: `No. ${index}`,
      //   x: "",
      //   image: link ,
      //   mainColor: readColor(link , image.metadata.contentType),
      //   isWrapper: false,
      //   // Category.create({
      //   //   name: name,
      //   //   rank: getRandomNumber(1, 10),
      //   //   image: files[index].metadata.mediaLink,
      //   //   isMutil: index % 6 === 0,
      //   //   isNew: index % 5 === 0,
      //   // });
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
  let fimg = await fetch(url);

  let buffer = Buffer.from(await fimg.arrayBuffer());
  console.log(fimg.name);
  let colors = await getColors(buffer, imageType);
  return colors[0].hex();
}

module.exports = { listAllFilesCards, readColor };
