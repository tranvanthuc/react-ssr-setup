module.exports = server => {
  const express = require('express');
  const router = express.Router();

  const categories = require('../controllers/category.controller.js');

  // Create a new Category
  router.post('/', categories.create);

  // Retrieve all Categories
  router.get('/', categories.findAll);

  // Retrieve a single Category with categoryId
  router.get('/:id', categories.findOne);

  // Update a Category with categoryId
  router.put('/:id', categories.update);

  // Delete a Category with categoryId
  router.delete('/:id', categories.delete);

  server.use('/api/categories', router);
};
