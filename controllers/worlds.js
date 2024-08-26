const World = require('../models/world');

/**
 * get Card by id
 */
const getWorlds = async (req, res) => {
  let worlds = await World.find({});

  res.status(200).json(worlds);
};

module.exports = { getWorlds };
