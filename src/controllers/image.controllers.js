const multer = require('multer');
const path = require('path');
const ImageService = require('../services/image.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('file');

const add = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.send(200);
};

module.exports = {
  add,
  upload
};
