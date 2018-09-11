module.exports = server => {
  require('./note.routes')(server);
  require('./user.routes')(server);
  require('./auth.routes')(server);
  // require('./course.routes')(server);
  require('./category.routes')(server);
};
