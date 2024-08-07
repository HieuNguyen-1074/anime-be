const CardModel = require('../models/card');

/**
 * get Card by id
 */
const getCards = async (req, res) => {
  const cards = await CardModel.find({});
  console.log(cards);
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
  const card = await CardModel.find({ isWrapper: true });
  if (!card[0]) {
    res.status(404);
    throw new Error('Card not found');
  }
  res.status(200).json(card[0]);
};

module.exports = { getCards, getCardWrapper };
