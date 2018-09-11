import response from '../utils/response';
const Course = require('../models/course.model.js');

// Create and Save a new Course
exports.create = (req, res) => {
  // Create a Course
  req.body.owner = req.userId;
  const course = new Course(req.body);

  // Save Course in the database
  course
    .save()
    .then(data => {
      res.send(response.success(data));
    })
    .catch(err => {
      res.status(500).send(response.error(err.message));
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Find note and update it with the request body
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(course => {
      res.send(response.success(course));
    })
    .catch(err => {
      res.status(500).send(response.error(err.message));
    });
};

// Retrieve and return all notes from the database.
exports.findOne = (req, res) => {
  Course.findById(req.params.id)
    .then(course => {
      res.send(response.success(course));
    })
    .catch(err => {
      res.status(500).send(response.error(err.message));
    });
};
