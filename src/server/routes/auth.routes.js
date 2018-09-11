module.exports = server => {
  const express = require('express');
  const router = express.Router();
  const VerifyToken = require('../utils/VerifyToken');
  const auth = require('../controllers/auth.controller.js');

  // Create a new User
  router.post('/register', auth.register);

  router.post('/login', auth.login);

  router.get('/me', VerifyToken, auth.me);

  server.use('/api/auth', router);
};
