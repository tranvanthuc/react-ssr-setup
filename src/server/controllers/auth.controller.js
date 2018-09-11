const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const response = require('../utils/response');

// Create and Save a new User
exports.register = (req, res) => {
  // Validate request

  // Create a User
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  const user = new User(req.body);

  user
    .save()
    .then(data => {
      const token = jwt.sign({ id: data._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send(response.success({ token: token }));
    })
    .catch(err => {
      res.status(500).send(response.error(err.message));
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send(response.success({ token: token }));
  });
};

// me
exports.me = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');

    res.status(200).send(response.success(user));
  });
};
