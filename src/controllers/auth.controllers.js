const UserService = require('../services/user.services');
const jwt = require('jsonwebtoken');
const strings = require('../util/strings');
const HTTPStatus = require('http-status-codes');
const rError = require('../util/error');
const rSuccess = require('../util/success');

module.exports = {
  login: async (req, res) => {
    try {
      const user = await UserService.get({where: {email: req.body.email}});

      if (!user) {
        return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.notFound);
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify({
            id: user.id
          })), process.env.JWT, {expiresIn: 86400 * 30});

          return jwt.verify(token, process.env.JWT, function (err, data) {
            if (!err) {
              return rSuccess(res, HTTPStatus.OK, {token: 'JWT ' + token});
            }

            return rError(res, HTTPStatus.INTERNAL_SERVER_ERROR, strings.errors.failToken);
          });
        }

        return rError(res, HTTPStatus.UNAUTHORIZED, strings.login.wrongPassword);
      });
    } catch (error) {
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  },
  activate: async (req,res) => {
    try {
      const data = await jwt.verify(req.query.token, process.env.JWT);

      const user = await UserService.get({where: {id: data.id}});

      if(!user){
        return rError(res, HTTPStatus.NO_CONTENT, strings.errors.noUser);
      }

      if(user.isActive){
        return rError(res, HTTPStatus.CONFLICT, strings.errors.isActive);
      }

      user.isActive = true;

      await user.save();

      return rSuccess(res, HTTPStatus.OK, strings.activate.success);
    }catch(error){
      return rError(res, HTTPStatus.BAD_REQUEST, error);
    }
  }
};
