const express = require('express');
const { getWorlds } = require('../controllers/worlds');

const router = express.Router();

router
  .route('/')

  .get(getWorlds);

module.exports = router;
