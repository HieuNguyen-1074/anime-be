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
  const emblem = Emblem.findById(embId);
  const categories = await Category.find({});
  const cards = await CardModel.find({});
  if (!emblem) res.status(404).json('couldnt found');
  emblem.categories = categories.map((category) => {
    const cards = cards.filter(
      (card) =>
        card.categoryId === category._id.$oid && card.emblemIds.includes(embId)
    );
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
  res.status(200).json(emblem);
};

module.exports = { getEmblems, getEmblemById };
