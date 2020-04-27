const UserSchema = require('../db/schemas/user.schemas');
const UserSettingSchema = require('../db/schemas/usersetting.schemas');
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

module.exports = {
  userAdd,
  userUpdate,
  userSettingUpdate
};
