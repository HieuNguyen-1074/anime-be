const CardModel = require('../models/card');
const Category = require('../models/category');

const { Types } = require('mongoose');

/**
 * get Card by id
 */
const getCards = async (req, res) => {
  let cards = await CardModel.find({});
  const categories = await Category.find({});
  cards = cards.map((card) => {
    return {
      ...card,
      category: categories.find(
        (category) => category._id.$oid === card.categoryId.$oid
      ),
    };
  });
  //   if (!mongoose.isValidObjectId(req.params.id)) {
  //     res.status(400);
  //     throw new Error('Invalid Card id');
  //   }
  //   const card = await CardModel.findById(req.params.id);
  //   if (!card) {
  //     res.status(404);
  //     throw new Error('Card not found');
  //   }
  res.status(200).json(cards);
};

/**
 * get Card by id
 */
const getCardWrapper = async (req, res) => {
  let cards = await CardModel.find({ isWrapper: true });
  const categories = await Category.find({});
  console.log(categories);
  cards = cards.map((card) => {
    return {
      ...card._doc,
      category: categories.find((category) => {
        console.log(category._id, card.categoryId);
        return category._id.$oid === card.categoryId.$oid;
      }),
    };
  });
  if (!cards[0]) {
    res.status(404);
    throw new Error('Card not found');
  }
  console.log(cards[0]);
  res.status(200).json(cards[0]);
};

module.exports = { getCards, getCardWrapper };
