const CollectionModel = require('../models/collector');

/**
 * get Card by id
 */
const getCollectors = async (req, res) => {
  const collectors = await CollectionModel.find({});
  //   if (!mongoose.isValidObjectId(req.params.id)) {
  //     res.status(400);
  //     throw new Error('Invalid Card id');
  //   }
  //   const card = await CardModel.findById(req.params.id);
  //   if (!card) {
  //     res.status(404);
  //     throw new Error('Card not found');
  //   }
  res.status(200).json(collectors);
};

module.exports = { getCollectors };
