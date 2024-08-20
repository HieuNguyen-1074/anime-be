const CardModel = require('../models/card');
const Category = require('../models/category');

const { Types } = require('mongoose');
const Emblem = require('../models/emblem');

/**
 * get Card by id
 */
const getCards = async (req, res) => {
  let cards = await CardModel.find({});
  const emblems = await Emblem.find({});
  const categories = await Category.find({});
  cards = cards.map((card) => {
    return {
      ...card._doc,
      emblems: emblems.filter((emblem) =>
        card.emblemId.includes(emblem._id.$oid)
      ),
      category: categories.find(
        (category) => category._id.$oid === card.categoryId.$oid
      ),
    };
  });

  res.status(200).json(cards);
};

const getCardsbyCategory = async (req, res) => {
  const { categoryId, pageSize, pageNo } = req.params;

  let cards = [];
  if (categoryId === 'ALL') {
    cards = await CardModel.find({}).limit(pageSize).skip(pageSize);
    res.status(200).json(cards);
    return;
  }
  cards = await CardModel.find({ categoryId: categoryId })
    .limit(pageSize)
    .skip(pageSize);

  const emblems = await Emblem.find({});
  const categories = await Category.find({});
  cards = cards.filter((card) => {
    return {
      ...card._doc,
      emblems: card.emblemId
        ? emblems.filter((emblem) => card.emblemId.includes(emblem._id.$oid))
        : [],
      category: categories.find((category) => category._id === card.categoryId),
    };
  });

  res.status(200).json(cards);
};

/**
 * get Card by id
 */
const getCardWrapper = async (req, res) => {
  let cards = await CardModel.find({ isWrapper: true });

  const emblems = await Emblem.find({});
  const categories = await Category.find({});
  cards = cards.map((card) => {
    return {
      ...card._doc,
      emblems: emblems.filter((emblem) => {
        return card.emblemIds.includes(emblem._id);
      }),
      category: categories.find(
        (category) => category._id.$oid === card.categoryId
      ),
    };
  });

  if (!cards[0]) {
    res.status(404);
    throw new Error('Card not found');
  }
  res.status(200).json(cards[0]);
};

/**
 * get Card by id
 */
const getCardHighlight = async (req, res) => {
  let cards = await CardModel.find({ isHighLight: true });
  const emblems = await Emblem.find({});
  const categories = await Category.find({});
  cards = cards.map((card) => {
    return {
      ...card._doc,
      emblems: emblems.filter((emblem) => {
        return card.emblemIds.includes(emblem._id);
      }),
      category: categories.find(
        (category) => category._id.$oid === card.categoryId
      ),
    };
  });

  res.status(200).json(cards);
};

module.exports = {
  getCards,
  getCardWrapper,
  getCardHighlight,
  getCardsbyCategory,
};
