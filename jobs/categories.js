const { initializeApp } = require('firebase-admin/app');
const { getStorage, list, ref } = require('firebase-admin/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCGmSIICM0GPyd_5j32SBFdsgUiOErPnKA',
  authDomain: 'anime-3b6ad.firebaseapp.com',
  projectId: 'anime-3b6ad',
  storageBucket: 'anime-3b6ad.appspot.com',
  messagingSenderId: '855637424268',
  appId: '1:855637424268:web:2295c7747caf978aa2e3a9',
  measurementId: 'G-BCLTPFJV5H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const s = app.getStorage().bucket().getFiles({ prefix: 'images/categories' });
console.log(s.then((data) => console.log(data)));

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
