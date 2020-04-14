const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const jwt = require('jsonwebtoken');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  add: async (req, res) => {
    try {
      const user = await UserService.add({
        email: req.body.email,
        password: req.body.password
      });

      const url = req.protocol + '://' + req.get('host');
      const activateToken = jwt.sign(JSON.parse(JSON.stringify({
        id: user.id
      })), process.env.JWT, {expiresIn: 86400 * 30});

      MailService.send({
        to: [user.email],
        subject: strings.email.newUser,
        template: 'new-user',
        templateVars: {
          name: user.email,
          url: `${url}/auth/activate?token=${activateToken}`
        }
      });

      return rSuccess(res, HTTPStatus.CREATED, user);
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
