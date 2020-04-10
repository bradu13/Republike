const UserService = require('../services/user.services');
const strings = require('../util/strings');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  add: async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return rError(res, HTTPStatus.BAD_REQUEST, strings.register.noData);
    }

    try {
      const user = await UserService.add({
        username: req.body.username,
        password: req.body.password
      });

      return rSuccess(res, HTTPStatus.CREATED, user);
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
