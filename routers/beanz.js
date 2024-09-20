const express = require('express');
const { getBenzs, getBenzsPost } = require('../controllers/beanz');

const router = express.Router();

router
  .route('/')

  .get(getBenzs);

router
  .route('/posts')

  .get(getBenzsPost);

module.exports = router;
