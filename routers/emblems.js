const express = require('express');
const { getCollectors } = require('../controllers/collector');
const { getEmblems } = require('../controllers/emblems');

const router = express.Router();

router
  .route('/')

  .get(getEmblems);

module.exports = router;
