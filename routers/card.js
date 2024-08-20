const express = require('express');
const {
  getCards,
  getCardWrapper,
  getCardHighlight,
  getCardsbyCategory,
} = require('../controllers/card');

const router = express.Router();
router.route('/').get(getCards);

router
  .route('/')

  .get(getCardWrapper);
router
  .route('/wrapper')

  .get(getCardWrapper);
router
  .route('/category/:categoryId')

  .get(getCardsbyCategory);
router
  .route('/highlight')

  .get(getCardHighlight);

module.exports = router;
