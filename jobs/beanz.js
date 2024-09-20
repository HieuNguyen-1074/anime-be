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
const BenzModel = require('../models/beanz');

const datas = [
  {
    'name': 'Frida',
    'description':
      'Frida is a creative force who finds inspiration in the most unlikely places. Although drawing is her first love, she also has a musical side. Her art brims with color, joy, and life—just like Frida herself!',
    'traits':
      'For a creative few, the world is their canvas. Yellow BEANZ are often creatives, artists, writers, and musicians.',
    'color': 'yellow',
    colorMain: '#FF98C1',
    position: 2,
  },
  {
    'name': 'Ed',
    'description':
      "Ed never skips leg day. He's the happiest when working out with other edamame beefcakes at the gym, ripping sets, and getting shredded. If there's a mirror around, you bet Ed is going to check out his guns because he works hard for that bean bod!",
    'traits':
      'Edamame BEANZ love to work out! They are great workout buddies, personal trainers, and endurance athletes.',
    'color': 'green',
    colorMain: '#40A49B',
    position: 1,
  },
  {
    'name': 'Jelly',
    'description':
      'Jelly is highly snarky, small yet sassy. She loves to make fun of others, but the teasing is mostly good-natured. Extremely intelligent and a little bit dramatic, she enjoys saying things to provoke others.',
    'traits':
      'Purple BEANZ are max chill. They are the only BEANZ that can get red and blue BEANZ to get along. Perfect companion for a chill hang.',
    'color': 'purple',
    position: 2,
    colorMain: '#9C77CB',
  },
  {
    'name': 'Jay',
    'description':
      'Jay is a natural leader with a heart of gold and a great sense of humor. He is very patient with Jelly and his little brother, Toshi. Despite his good intentions, Jay tends to end up in sticky situations, but he always finds a way to make things work.',
    'traits':
      'Red BEANZ bring positive vibes to the garden. Most of them are helpful sidekicks, and even the most maverick ones are dedicated to fighting for the garden.',
    'color': 'red',
    position: 1,
    colorMain: '#EBEBE6',
  },
  {
    'name': 'Toshi',
    'description':
      'Toshi is young and full of energy, always ready for an adventure. Although normally super sweet, Toshi also has a mischievous side—especially when playing pranks on his older brother, Jay.',
    'traits':
      'Red BEANZ bring positive vibes to the garden. Most of them are helpful sidekicks, and even the most maverick ones are dedicated to fighting for the garden.',
    'color': 'red',
    position: 2,
    colorMain: '#171717',
  },
  {
    'name': 'Link',
    'description':
      'Link is very intellectually curious and can often be found tapping away on her laptop. Highly analytical, she has a keen eye for detail and a near photographic memory.',
    'traits':
      'Black BEANZ are intelligent and curious by nature. These BEANZ never stop learning and always have something insightful to share.',
    'color': 'black',
    position: 1,
    colorMain: '#423E4D',
  },
  {
    'name': 'Gus',
    'description':
      "Gus can't seem to stay out of trouble. If you hear an Azuki yell out in anger, most likely you'd see this little fellow scurrying away gleefully. Love him or hate him, life would simply be boring without Gus around!",
    'traits':
      "Blue BEANZ are a menace to all. They love to troll and cause trouble whenever they can. You won't find a better partner-in-crime (or a more annoying prankster).",
    'color': 'blue',
    position: 1,
    colorMain: '#0267BC',
  },
  {
    'name': 'Penny',
    'description':
      "Penny is... unique. She doesn't need others for entertainment, she does just fine entertaining herself. She runs about muttering and squeaking randomly. No one is sure what goes through Penny's mind, but she seems happy.",
    'traits':
      "Pinto BEANZ are wacky oddballs. They have truly eccentric personalities and aren't afraid to be a little different.",
    'color': 'pinto',
    position: 2,
    colorMain: '#DAAA61',
  },
  {
    'name': 'Johnny',
    'description':
      "Johnny Grind is full of chaotic energy. Always with a cup of coffee in hand, he tends to drive the other BEANZ a little crazy. He means well, but the other BEANZ sometimes wish he'd take it down a notch (or five).",
    'traits':
      'Coffee BEANZ are the life of the party. They never seem to get tired and are always up for a good time.',
    'color': 'coffee',
    position: 1,
    colorMain: '#6E4745',
  },
  {
    'name': 'Pip',
    'description':
      "Pip is the happiest when she's by herself. She enjoys solitude yet still likes to hang out with a close-knit group of friends from time to time. Pip is a bean of few words, but when she speaks, she's full of wisdom.",
    'traits':
      "Black-eyed BEANZ are mostly quiet and introverted. Even when they don't say much, they speak volumes.",
    'color': 'black-eyed',
    position: 2,
    colorMain: '#729CB2',
  },
];

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
async function listAllFilesBenz() {
  try {
    const [files] = await admin.storage().bucket().getFiles({
      prefix: 'images/benz/avatars',
    });

    const [files2] = await admin.storage().bucket().getFiles({
      prefix: 'images/benz/icons',
    });

    datas.forEach((data, index) => {
      const name = data.name.toLocaleLowerCase();

      const avatar = files.find(
        (file) => file.metadata.name.indexOf(name) !== -1
      ).metadata.mediaLink;

      const icon = files2.find((file2) => {
        return file2.metadata.name.indexOf(data.color) !== -1;
      }).metadata.mediaLink;

      // console.log(emblems);

      // console.log(files[index].metadata);

      // console.log(color, avatar);

      const dataBenz = {
        'name': data.name,
        'description': data.description,
        'traits': data.traits,
        'color': data.colorMain,
        icon: icon,
        avatar: avatar,
        position: data.position,
      };
      BenzModel.create(dataBenz);
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
    console.log(url);

    const color = Jimp.intToRGBA(image.getPixelColor(10, 10));
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  } catch (error) {
    // console.log(error);
    return;
  }
}

module.exports = { listAllFilesBenz, readColor };
