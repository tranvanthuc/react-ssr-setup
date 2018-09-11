module.exports = server => {
  const express = require('express');
  const router = express.Router();
  const VerifyToken = require('../utils/VerifyToken');

  const courses = require('../controllers/course.controller.js');

  // create course
  router.post('/', VerifyToken, courses.create);

  // update course
  router.put('/:id', VerifyToken, courses.update);

  // Retrieve a single Note with id
  router.get('/:id', VerifyToken, courses.findOne);

  server.use('/api/coures', router);
};
