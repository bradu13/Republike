const UserSchema = require('../db/schemas/user.schemas');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');

const userValidation = async (req, res, next) => {
  const user = req.body;
  const result = UserSchema.validate(user);

  if (!result.error) {
    return next();
  }

  return rError(res, HTTPStatus.BAD_REQUEST, result.error);
};

module.exports = {
  userValidation
};
