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
    console.log(
      categories.find((category) => category._id === card.categoryId)
    );
    return {
      ...card._doc,
      emblems: emblems.filter((emblem) =>
        card.emblemId.includes(emblem._id.$oid)
      ),
      category: categories.find((category) => category._id === card.categoryId),
    };
  });

  res.status(200).json(cards);
};

const getCardsbyCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { pageSize, pageNo } = req.query;

  const from = pageNo === 1 ? 0 : (pageNo - 1) * pageSize;
  const to = from + parseInt(pageSize);
  console.log(from, to);
  let cards = [];
  let count = 0;
  if (categoryId === 'ALL') {
    cards = await CardModel.find({}).limit(to).skip(from);
    count = await CardModel.find({}).count();
  } else {
    cards = await CardModel.find({ categoryId: categoryId })
      .limit(to)
      .skip(from);
    count = await CardModel.find({ categoryId: categoryId }).count();
  }

  const emblems = await Emblem.find({});
  const categories = await Category.find({});
  cards = cards.map((card) => {
    return {
      ...card._doc,
      emblems: card.emblemIds
        ? emblems.filter((emblem) => card.emblemIds.includes(emblem._id))
        : [],
      category: categories.find((category) => category._id == card.categoryId),
    };
  });

  res.status(200).json({ list: cards, total: count });
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
      category: categories.find((category) => category._id === card.categoryId),
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
      category: categories.find((category) => category._id == card.categoryId),
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
