const UserService = require('../services/user.services');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  add: async (req, res) => {
    try {
      const user = await UserService.add({
        email: req.body.email,
        password: req.body.password
      });

      return rSuccess(res, HTTPStatus.CREATED, user);
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
