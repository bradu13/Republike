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
      throw strings.errors.getUser;
    }
  },
  getById: async (id) => {
    try {
      return await UserModel.findOne({ where: { id } });
    } catch (error) {
      throw strings.errors.getUser;
    }
  },
  update: async (id, fields) => {
    try {
      const user = await UserModel.findOne({ where: { id } });

      if (!user) {
        return user;
      }

      await user.update(fields);

      return user;
    } catch (error) {
      throw strings.errors.updateUser;
    }
  },
  addFriend: async (user, friend) => {

    if(!friend.isActive){
      throw strings.errors.inactiveFriend;
    }

    if(friend.isDeleted){
      throw strings.errors.deletedFriend;
    }

    if(!Array.isArray(user.friends)){
      user.friends = [];
    }

    user.friends.push(friend.id);

    await user.save();
  }
};
