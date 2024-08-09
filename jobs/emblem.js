var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
const Emblem = require('../models/emblem');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'anime-3b6ad.appspot.com',
});
const nameOfCategories = [
  'Torii gate',
  'Samurai helmet',
  'Circular pattern',
  'Fiery face',
  'Tiger face',
  'Happy face',
  'Mustache and beard face',
  'Butterfly',
  'Water swirl',
  'Monkey face',
  'Headset face',
  'Pyramid',
  'Fox head',
  'Abstract swirl',
  'Kite with a string',
  'Geometric square with an eye',
  'Two interlocked squares',
  'Circular swirl with stars',
  'Animal paw',
  'Flame',
  'Blue swirl',
  'Leaf pattern',
  'Zigzag pattern',
  'Shield',
  'Orange swirl',
  'Pink swirl',
  'Two crossed lines',
  'Golden fish',
  'Yin-Yang symbol',
  'Blue swirl with dots',
  'Bear face',
  'Red claw',
  'Circular blue swirl',
  'Flower',
  'Zigzag arrow',
  'Animal paw',
  'Bear face',
  'Leaf',
  'Flaming dragon',
  'A in a circle',
];

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

async function listAllFiles() {
  try {
    const [files] = await admin.storage().bucket().getFiles({
      prefix: 'images/emblems',
    });
    nameOfCategories.forEach((name, index) => {
      if (!files[index]?.metadata) return;
      // console.log(files[index].metadata.contentType);
      // Emblem.create({
      //   name: name,
      //   rank: getRandomNumber(1, 10),
      //   image: files[index].metadata.mediaLink,
      //   isMutil: index % 6 === 0,
      //   isNew: index % 5 === 0,
      // });
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
module.exports = { listAllFiles };
