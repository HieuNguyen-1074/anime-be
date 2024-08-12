const express = require('express');
const {
  getCards,
  getCardWrapper,
  getCardHighlight,
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
  .route('/highlight')

  .get(getCardHighlight);

module.exports = router;
