const jwt = require('jsonwebtoken');
const config = require('../config');
const response = require('../utils/response');

module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(403).send(response.error('No token provided.'));
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send(response.error('Failed to authenticate token.'));
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};
