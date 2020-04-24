const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const jwt = require('jsonwebtoken');
const strings = require('../util/strings');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

// Login User
const login = async (req, res) => {
  try {
    // Get the user
    const user = await UserService.get({ where: { email: req.body.email } });

    // Check if found
    if (!user) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notFound);
    }

    // Check if is active
    if (!user.isActive) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notActive);
    }

    // Check if is deleted
    if (user.isDeleted) {
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.deleted);
    }

    // Check the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // Tokenize
        const token = jwt.sign(JSON.parse(JSON.stringify({
          id: user.id
        })), process.env.JWT, { expiresIn: 86400 * 30 });

        return jwt.verify(token, process.env.JWT, function (err) {
          // On match return the Token
          if (!err) {
            return rSuccess(res, HTTPStatus.OK, { token: 'JWT ' + token });
          }

          return rError(res, HTTPStatus.INTERNAL_SERVER_ERROR, strings.errors.failToken);
        });
      }

      // Wrong password;
      return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.wrongPassword);
    });
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Activate User
const activate = async (req, res) => {
  try {
    // Get the user
    const user = await UserService.get({ where: { id: req.user.id } });

    // Validations
    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    if (user.isActive) {
      return rError(res, HTTPStatus.CONFLICT, strings.errors.isActive);
    }

    // Activate user, save and send message
    user.isActive = true;

    await user.save();

    return rSuccess(res, HTTPStatus.OK, strings.activate.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Forgot Password
const forgot = async (req, res) => {
  // Validate body
  if (!req.body.email) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.userEmailRequired);
  }

  try {
    // Get the  user
    const user = await UserService.get({ where: { email: req.body.email } });

    // Validate user
    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    if (user.isDeleted) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.deletedUser);
    }

    // Create the url and the token
    const url = req.protocol + '://' + req.get('host');
    const forgotToken = jwt.sign(JSON.parse(JSON.stringify({
      id: user.id
    })), process.env.JWT, { expiresIn: 86400 });

    // Send the mail
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

// Reset Password
const reset = async (req, res) => {
  // Validate body
  if (!req.body.password) {
    return rError(res, HTTPStatus.BAD_REQUEST, strings.errors.noPassword);
  }

  try {
    // Get the user
    const user = await UserService.get({ where: { id: req.user.id } });

    // Validate user
    if (!user) {
      return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
    }

    if (user.isDeleted) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.deletedUser);
    }

    // Change the password and save
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
