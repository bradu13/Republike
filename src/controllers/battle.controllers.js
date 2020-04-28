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

const update = async (req, res) => {
  const battleId = req.params.id;

  try {
    const battle = await BattleService.getById(battleId);

    if (!battle) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattle);
    }

    if (battle.UserId !== req.user.id) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noBattleEditPermission);
    }

    await battle.update(req.body);

    return rSuccess(res, HTTPStatus.OK, battle);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  const battleId = req.params.id;

  try {
    const battle = await BattleService.getById(battleId);

    if (!battle) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noBattle);
    }

    if (battle.UserId !== req.user.id) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noBattleEditPermission);
    }

    await battle.destroy();

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  getAll,
  add,
  update,
  remove
};
