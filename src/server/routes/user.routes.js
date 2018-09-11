module.exports = server => {
  const express = require('express');
  const router = express.Router();

  const users = require('../controllers/user.controller.js');

  // Retrieve all Users
  router.get('/', users.findAll);

  // Retrieve a single User with userId
  router.get('/:userId', users.findOne);

  // Update a User with userId
  router.put('/:userId', users.update);

  // Delete a User with userId
  router.delete('/:userId', users.delete);

  server.use('/api/users', router);
};
