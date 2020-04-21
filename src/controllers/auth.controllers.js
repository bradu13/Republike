const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const jwt = require('jsonwebtoken');
const strings = require('../util/strings');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const login = async (req, res) => {
  try {
    const user = await UserService.get({ where: { email: req.body.email } });

    if (!user) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notFound);
    }

    if (!user.isActive) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notActive);
    }

    if (user.isDeleted) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.deleted);
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign(JSON.parse(JSON.stringify({
          id: user.id
        })), process.env.JWT, { expiresIn: 86400 * 30 });

        return jwt.verify(token, process.env.JWT, function (err, data) {
          if (!err) {
            return rSuccess(res, HTTPStatus.OK, { token: 'JWT ' + token });
          }

          return rError(res, HTTPStatus.INTERNAL_SERVER_ERROR, strings.errors.failToken);
        });
      }

      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.wrongPassword);
    });
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const activate = async (req, res) => {
  try {
    const user = await UserService.get({ where: { id: req.user.id } });

    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    if (user.isActive) {
      return rError(res, HTTPStatus.CONFLICT, strings.errors.isActive);
    }

    user.isActive = true;

    await user.save();

    return rSuccess(res, HTTPStatus.OK, strings.activate.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const forgot = async (req, res) => {
  if (!req.body.email) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.userEmailRequired);
  }

  try {
    const user = await UserService.get({ where: { email: req.body.email } });

    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    const url = req.protocol + '://' + req.get('host');
    const forgotToken = jwt.sign(JSON.parse(JSON.stringify({
      id: user.id
    })), process.env.JWT, { expiresIn: 86400 });

    MailService.send({
      to: [user.email],
      subject: strings.email.forgotPassword,
      template: 'new-password',
      templateVars: {
        name: user.email,
        url: `${url}/auth/reset?token=${forgotToken}`
      }
    });

    return rSuccess(res, HTTPStatus.OK, strings.forgot.sent);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const reset = async (req, res) => {
  if (!req.body.password) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.noPassword);
  }

  try {
    const user = await UserService.get({ where: { id: req.user.id } });

    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    user.password = req.body.password;

    await user.save();

    return rSuccess(res, HTTPStatus.OK, strings.reset.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  login,
  activate,
  forgot,
  reset
};
