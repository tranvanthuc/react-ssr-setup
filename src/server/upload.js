const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './static/uploads');
  },
  filename: function(req, file, callback) {
    console.log(file);
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });
module.exports = upload;
