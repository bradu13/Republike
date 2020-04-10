const UserService = require('../services/user.services');
const jwt = require('jsonwebtoken');
const strings = require('../util/strings');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  login: async (req, res) => {
    try {
      const user = await UserService.get({ where: { username: req.body.username } });

      if (!user) {
        return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notFound);
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT, { expiresIn: 86400 * 30 });

          jwt.verify(token, process.env.JWT, function (err, data) {
            console.log(err, data);
          });

          return rSuccess(res, HTTPStatus.OK, { token: 'JWT ' + token });
        }
        return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.wrongPassword);
      });
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
