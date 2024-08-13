const express = require('express');
const { getCollectors } = require('../controllers/collector');
const { getEmblems, getEmblemById } = require('../controllers/emblems');

const router = express.Router();

router
  .route('/')

  .get(getEmblems);
router
  .route('/:embId')

  .get(getEmblemById);

module.exports = router;
