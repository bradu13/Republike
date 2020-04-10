const UserModel = require('../db').User;
const strings = require('../util/strings');

module.exports = {
  add: async (user) => {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.log(error);
      throw Error(strings.errors.addUser);
    }
  }
};
