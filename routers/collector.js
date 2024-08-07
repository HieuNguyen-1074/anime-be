const express = require('express');
const { getCollectors } = require('../controllers/collector');

const router = express.Router();

router
  .route('/')

  .get(getCollectors);

module.exports = router;
