const express = require('express');
const printsRouter = express.Router();
const { requireUser } = require('./utils');

const {
  getAllPrints,
  getPrintById,
  createPrint,
  updatePrint,
} = require('../db');

printsRouter.use((req, res, next) => {
  console.log('A request is being made to /prints');

  next();
});

// GET /api/prints

printsRouter.get('/', async (req, res) => {
  const prints = await getAllPrints();
  res.send({
    prints,
  });
});

printsRouter.get('/:printId', requireUser, async (req, res, next) => {
  let id = req.params.printId;
  try {
    if (req.user) {
      const printById = await getPrintById(id);
      res.send(printById);
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/prints

printsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, image, description, cost, location, groups } = req.body;
  if (req.user);
  {
    try {
      const newPrint = await createPrint({
        title,
        image,
        description,
        cost,
        location,
        groups,
      });

      res.send(newPrint);
    } catch (error) {
      next(error);
    }
  }
});

//PATCH /api/prints/:printId
printsRouter.patch('/:printId', requireUser, async (req, res, next) => {
  const { title, image, description, cost, location, groups, active } =
    req.body;

  const id = req.params.printId;

  try {
    const ogPrint = await getPrintById(id);

    if (!ogPrint) {
      next({
        error: 'error',
        name: 'NoPrintFoundError',
        message: `Print ${id} not found`,
      });
    } else {
      const updatedPrint = await updatePrint(id, {
        title,
        image,
        description,
        cost,
        location,
        groups,
        active,
      });

      res.send(updatedPrint);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = printsRouter;
