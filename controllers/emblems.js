const CardModel = require('../models/card');
const Category = require('../models/category');
const Emblem = require('../models/emblem');

/**
 * get Card by id
 */
const getEmblems = async (req, res) => {
  const categories = await Emblem.find({});
  //   if (!mongoose.isValidObjectId(req.params.id)) {
  //     res.status(400);
  //     throw new Error('Invalid Card id');
  //   }
  //   const card = await CardModel.findById(req.params.id);
  //   if (!card) {
  //     res.status(404);
  //     throw new Error('Card not found');
  //   }
  res.status(200).json(categories);
};
const getEmblemById = async (req, res) => {
  const embId = req.params.embId;

  if (!embId) res.status(404).json('couldnt found');
  let emblem = await Emblem.findById(embId);
  const categories = await Category.find({});
  const cards = await CardModel.find({});
  if (!emblem) res.status(404).json('couldnt found');
  console.log(emblem, categories);

  //   if (!mongoose.isValidObjectId(req.params.id)) {
  //     res.status(400);
  //     throw new Error('Invalid Card id');
  //   }
  //   const card = await CardModel.findById(req.params.id);
  //   if (!card) {
  //     res.status(404);
  //     throw new Error('Card not found');
  //   }
  const ct = categories.map((category) => {
    const cardsMatch = cards.filter(
      (card) =>
        card.categoryId == category._id && card.emblemIds.includes(embId)
    );

    return {
      ...category._doc,
      cards: cardsMatch,
    };
  });

  res.status(200).json({
    ...emblem._doc,
    categories: ct,
  });
};

module.exports = { getEmblems, getEmblemById };
