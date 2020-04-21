const UserModel = require('../db').User;
const strings = require('../util/strings');

module.exports = {
  add: async (user) => {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.log(error);
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
    if (!friend.isActive) {
      throw strings.errors.inactiveFriend;
    }

    if (friend.isDeleted) {
      throw strings.errors.deletedFriend;
    }

    if (!Array.isArray(user.friends)) {
      user.friends = [];
    }

    if (!Array.isArray(friend.friends)) {
      friend.friends = [];
    }

    if (user.friends.includes(friend.id)){
      throw strings.errors.alreadyFriends;
    }

    user.friends.push(friend.id);
    friend.friends.push(user.id);

    await user.save();
    await friend.save();
  },
  deleteFriend: async (user, friend) => {
    if (!Array.isArray(user.friends)) {
      throw strings.errors.noFriends;
    }

    if (!user.friends.contains(friend.id)) {
      throw strings.errors.friendNotFound;
    }

    const indexUser = user.friends.indexOf(friend.id);
    const indexFriend = friend.friends.indexOf(user.id);

    user.friends.splice(indexUser, 1);
    friend.friends.splice(indexFriend, 1);

    await user.save();
    await friend.save();
  },
  addFriendRequest: async (user, friend) => {
    if (!friend.isActive) {
      throw strings.errors.inactiveFriend;
    }

    if (friend.isDeleted) {
      throw strings.errors.deletedFriend;
    }

    if (!Array.isArray(user.friendRequests)) {
      user.friendRequests = [];
    }

    user.friendRequests.push(friend.id);

    await user.save();
  }
};
