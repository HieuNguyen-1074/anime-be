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

module.exports = { getEmblems };
