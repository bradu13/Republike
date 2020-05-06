const UserSchema = require('../db/schemas/user.schemas');
const BattleSchema = require('../db/schemas/battle.schemas');
const BattlePostSchema = require('../db/schemas/battlepost.schemas');
const UserSettingSchema = require('../db/schemas/usersetting.schemas');
const ReportSchema = require('../db/schemas/report.schemas');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');

const userAdd = async (req, res, next) => {
  const user = req.body;
  const result = UserSchema.create.validate(user);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const userUpdate = async (req, res, next) => {
  const user = req.body;

  const result = UserSchema.update.validate(user);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const userSettingUpdate = async (req, res, next) => {
  const userSetting = req.body;

  const result = UserSettingSchema.validate(userSetting);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const battleAdd = async (req, res, next) => {
  const battle = req.body;

  const result = BattleSchema.create.validate(battle);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const battleUpdate = async (req, res, next) => {
  const battle = req.body;

  const result = BattleSchema.update.validate(battle);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const battlePostAdd = async (req, res, next) => {
  const battlePost = req.body;

  const result = BattlePostSchema.create.validate(battlePost);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const battlePostUpdate = async (req, res, next) => {
  const battle = req.body;

  const result = BattlePostSchema.update.validate(battle);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

const reportAdd = async (req, res, next) => {
  const report = req.body;

  const result = ReportSchema.create.validate(report);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

module.exports = {
  userAdd,
  userUpdate,
  userSettingUpdate,
  battleAdd,
  battleUpdate,
  battlePostAdd,
  battlePostUpdate,
  reportAdd
};
