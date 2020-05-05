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

const get = async (req, res) => {
  try {
    const post = await BattlePostService.get(req.params.id);

    if (!post) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattlePost);
    }

    return rSuccess(res, HTTPStatus.OK, post);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const update = async (req, res) => {
  try {
    const post = await BattlePostService.get(req.params.id);

    if (!post) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattlePost);
    }

    await BattlePostService.update(post, req);

    return rSuccess(res, HTTPStatus.OK, post);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    const post = await BattlePostService.get(req.params.id);

    if (!post) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattlePost);
    }

    await BattlePostService.remove(post, req);

    return rSuccess(res, HTTPStatus.OK, strings.errors.deletedBattlePost);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  get,
  update,
  remove
};
