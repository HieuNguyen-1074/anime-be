const CardModel = require('../models/card');
const Category = require('../models/category');

/**
 * get Card by id
 */
const getCategories = async (req, res) => {
  let categories = await Category.find({});

  res.status(200).json(categories);
};

module.exports = { getCategories };
