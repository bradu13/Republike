const jwt = require('jsonwebtoken');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const strings = require('../util/strings');

module.exports = (req, res, next) => {
  // The token is set in the Authorization header with Bearer in front of the token.
  const token = (req.headers['x-access-token'] || req.headers.authorization).split(' ')[1];

  if (!token) {
    return rError(res, HTTPStatus.FORBIDDEN, strings.errors.noToken);
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return rError(res, HTTPStatus.FORBIDDEN, strings.errors.failToken);
    }

    req.user = {
      username: decoded.username,
      id: decoded.id
    };

    return next();
  });
};
