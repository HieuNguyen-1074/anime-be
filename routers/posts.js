const express = require('express');
const { getPosts, getPostById } = require('../controllers/post');

const router = express.Router();

router
  .route('/')

  .get(getPosts);

router
  .route('/:postId')

  .get(getPostById);

module.exports = router;
