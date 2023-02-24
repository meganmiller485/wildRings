const express = require('express');
const printsRouter = express.Router();

const { getAllPosts } = require('../db');

printsRouter.use((req, res, next) => {
  console.log('A request is being made to /prints');

  next();
});

printsRouter.get('/', async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

module.exports = printsRouter;
