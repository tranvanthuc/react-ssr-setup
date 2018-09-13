exports.success = (data, message = '') => {
  return {
    status: true,
    data: data,
    message: message
  };
};

exports.error = (message, data = null) => {
  return {
    status: false,
    data: data,
    message: message
  };
};
