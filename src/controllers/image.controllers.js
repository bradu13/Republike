const ImageService = require('../services/image.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const upload = ImageService.upload;

const add = async (req, res) => {
  if (!req.file) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.noFile);
  }

  const webPath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const result = await ImageService.add(req.file.filename, webPath);

    return rSuccess(res, HTTPStatus.CREATED, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  upload
};
