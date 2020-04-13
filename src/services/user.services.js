const UserModel = require('../db').User;
const strings = require('../util/strings');

module.exports = {
  add: async (user) => {
    try {
      return await UserModel.create(user);
    } catch (error) {
      switch (error.name) {
        case 'SequelizeUniqueConstraintError':
          throw strings.errors.duplicateUser;
        default:
          throw strings.errors.addUser;
      }
    }
  },
  get: async (filter) => {
    try {
      return await UserModel.findOne(filter);
    } catch (error) {
      throw Error(strings.errors.getUser);
    }
  }
};
