const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  add: async (req, res) => {
    try {
      const user = await UserService.add({
        email: req.body.email,
        password: req.body.password
      });

      await MailService.send({
        title: strings.email.newUser,
        to: [user.email]
      });

      return rSuccess(res, HTTPStatus.CREATED, user);
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
