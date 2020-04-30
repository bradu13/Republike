const BattlePostService = require('../services/battlepost.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const add = async (req, res) => {
  const battlePost = req.body;
  battlePost.UserId = req.user.id;

  try {
    const result = await BattlePostService.add(battlePost);

    return rSuccess(res, HTTPStatus.CREATED, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add
};
