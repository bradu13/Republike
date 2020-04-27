const HTTPStatus = require('http-status-codes');
const UserSettingService = require('../services/usersetting.services');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const updateUserSetting = async (req, res) => {
  try {
    const setting = await UserSettingService.getByUserIdWithType(req.body.UserId, req.body.type);

    if (!setting) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUserSetting);
    }

    await setting.update(req.body);

    return rSuccess(res, HTTPStatus.OK, setting);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  updateUserSetting
};
