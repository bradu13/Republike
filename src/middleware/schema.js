const UserSchema = require('../db/schemas/user.schemas');
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

module.exports = {
  userAdd,
  userUpdate
};
