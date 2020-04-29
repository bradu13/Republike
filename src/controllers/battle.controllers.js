const BattleService = require('../services/battle.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const getAll = async (req, res) => {
  try {
    const battles = await BattleService.getAll();

    return rSuccess(res, HTTPStatus.OK, battles);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const add = async (req, res) => {
  const battle = req.body;
  battle.UserId = req.user.id;

  try {
    const result = await BattleService.add(battle);

    return rSuccess(res, HTTPStatus.CREATED, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const verify = async (req, res, next) => {
  const battleId = req.params.id;

  try {
    const battle = await BattleService.getById(battleId);

    if (!battle) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattle);
    }

    req.battle = battle;

    next();
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const update = async (req, res) => {
  try {
    if (req.battle.UserId !== req.user.id) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noBattleEditPermission);
    }

    await req.battle.update(req.body);

    return rSuccess(res, HTTPStatus.OK, req.battle);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    if (req.battle.UserId !== req.user.id) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noBattleEditPermission);
    }

    await req.battle.destroy();

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const view = async (req, res) => {
  try {
    await BattleService.view(req.battle, req.user);

    return rSuccess(res, HTTPStatus.OK, req.battle.views.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const share = async (req, res) => {
  try {
    await BattleService.share(req.battle, req.user);

    return rSuccess(res, HTTPStatus.OK, req.battle.shares.length);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  getAll,
  add,
  verify,
  update,
  remove,
  view,
  share
};
