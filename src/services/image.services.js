const multer = require('multer');
const path = require('path');
const ImageModel = require('../db').Image;
const strings = require('../util/strings');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage }).single('file');

const add = async (name, webPath) => {
  try {
    return await ImageModel.create({
      name,
      webPath
    });
  } catch (error) {
    throw strings.errors.addImage;
  }
};

module.exports = {
  upload,
  add
};
