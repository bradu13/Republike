const SearchService = require('../services/search.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const get = async (req, res) => {
  try {
    const result = await SearchService.search(req.query.text);

    return rSuccess(res, HTTPStatus.OK, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  get
};
