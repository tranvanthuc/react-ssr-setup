const Category = require('../models/category.model.js');
const response = require('../utils/response');

// Create and Save a new Category
exports.create = (req, res) => {
  // Create a Category
  const category = new Category(req.body);

  // Save Category in the database
  category
    .save()
    .then(data => {
      res.send(response.success(data));
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Category.'
      });
    });
};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
  Category.find({ parent: null })
    .then(categories => {
      res.send(response.success(categories));
    })
    .catch(err => {
      res.status(500).send(response.error(err.message));
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
  Category.find({ parent: req.params.id })
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.id
        });
      }
      res.send(response.success(category));
    })
    .catch(err => {
      return res.status(500).send(res.send(response.error(err.message)));
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Category content can not be empty'
    });
  }

  // Find category and update it with the request body
  Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      title: req.body.title || 'Untitled Category',
      content: req.body.content
    },
    { new: true }
  )
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.categoryId
        });
      }
      res.send(category);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.categoryId
        });
      }
      return res.status(500).send({
        message: 'Error updating category with id ' + req.params.categoryId
      });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.categoryId
        });
      }
      res.send({ message: 'Category deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.categoryId
        });
      }
      return res.status(500).send({
        message: 'Could not delete category with id ' + req.params.categoryId
      });
    });
};
