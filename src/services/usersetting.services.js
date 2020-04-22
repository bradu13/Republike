const UserSettingModel = require('../db').UserSetting;
const strings = require('../util/strings');

module.exports = {
  getByUserId: async (id) => {
    try {
      return {
        email: await UserSettingModel.findOne({ where: { UserId: id, type: 1 } }),
        notification: await UserSettingModel.findOne({ where: { UserId: id, type: 2 } })
      };
    } catch (error) {
      throw strings.errors.getUserSetting;
    }
  }
};
