const UserService = require('../services/user.services');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  add: async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return rError(res, 400, strings.register.noData);
    }

    try {
      const user = await UserService.add({
        username: req.body.username,
        password: req.body.password
      });

      return rSuccess(res, 201, user);
    } catch (error) {
      return rError(res, 400, error);
    }
  }
};
