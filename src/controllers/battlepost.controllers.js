const BattlePostService = require('../services/battlepost.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const load = async (req, res, next) => {
  try {
    const post = await BattlePostService.get(req.params.id);

    if (!post) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattlePost);
    }

    req.battlepost = post;

    return next();
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const verify = async (req, res, next) => {
  if (req.battlepost.UserId !== req.user.id) {
    return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noBattlePostDeletePermission);
  }
  next();
};

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
    return rSuccess(res, HTTPStatus.OK, req.battlepost);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const update = async (req, res) => {
  try {
    await BattlePostService.update(req);

    return rSuccess(res, HTTPStatus.OK, req.battlepost);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    await BattlePostService.remove(req);

    return rSuccess(res, HTTPStatus.OK, strings.errors.deletedBattlePost);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const like = async (req, res) => {
  try {
    await BattlePostService.like(req);

    return rSuccess(res, HTTPStatus.OK, req.battlepost.likes.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const dislike = async (req, res) => {
  try {
    await BattlePostService.dislike(req);

    return rSuccess(res, HTTPStatus.OK, req.battlepost.likes.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const share = async (req, res) => {
  try {
    await BattlePostService.share(req);

    return rSuccess(res, HTTPStatus.OK, req.battlepost.shares.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const view = async (req, res) => {
  try {
    await BattlePostService.view(req);

    return rSuccess(res, HTTPStatus.OK, req.battlepost.views.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  load,
  get,
  update,
  remove,
  like,
  verify,
  dislike,
  share,
  view
};
