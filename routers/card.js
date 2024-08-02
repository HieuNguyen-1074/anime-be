const express = require('express');
const { getCards, getCardWrapper } = require('../controllers/card');

const router = express.Router();
router.route('/').get(getCards);

router
  .route('/:id')

  .get(getCardWrapper);
router
  .route('/wrapper')

  .get(getCardWrapper);

module.exports = router;
