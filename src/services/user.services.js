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
    // check if the friend is active
    if (!friend.isActive) {
      throw strings.errors.inactiveFriend;
    }

    // check if the friend is not deleted
    if (friend.isDeleted) {
      throw strings.errors.deletedFriend;
    }

    // by default this is null
    if (!Array.isArray(user.friends)) {
      user.friends = [];
    }

    // by default this is null
    if (!Array.isArray(friend.friends)) {
      friend.friends = [];
    }

    // check if they are friends
    if (user.friends.includes(friend.id)) {
      throw strings.errors.alreadyFriends;
    }

    // make the connection
    user.friends.push(friend.id);
    friend.friends.push(user.id);

    // save the users
    await user.update({ friends: user.friends });
    await friend.update({ friends: friend.friends });
  },
  deleteFriend: async (user, friend) => {
    // check if the user has any friends
    if (!Array.isArray(user.friends)) {
      throw strings.errors.noFriends;
    }

    // check if they are friends
    if (!user.friends.includes(friend.id)) {
      throw strings.errors.friendNotFound;
    }

    // get the indexes
    const indexUser = user.friends.indexOf(friend.id);
    const indexFriend = friend.friends.indexOf(user.id);

    // remove the values
    user.friends.splice(indexUser, 1);
    friend.friends.splice(indexFriend, 1);

    // save the users
    await user.update({ friends: user.friends });
    await friend.update({ friends: friend.friends });
  },
  addFriendRequest: async (user, friend) => {
    // check if the friend is active
    if (!friend.isActive) {
      throw strings.errors.inactiveFriend;
    }

    // check if the friend is not deleted
    if (friend.isDeleted) {
      throw strings.errors.deletedFriend;
    }

    // by default the database stores a null value
    if (!Array.isArray(user.friendRequests)) {
      user.friendRequests = [];
    }

    // check if friend request was already sent
    if (user.friendRequests.includes(friend.id)) {
      throw strings.errors.friendRequestAlreadySent;
    }

    // check if they are friends
    if (Array.isArray(user.friends) && user.friends.includes(friend.id)) {
      throw strings.errors.alreadyFriends;
    }

    // send friend request
    user.friendRequests.push(friend.id);

    // update the user
    await user.update({ friendRequests: user.friendRequests });
  },
  deleteFriendRequest: async (user, friend) => {
    // check if the default value was changed
    if (!Array.isArray(user.friendRequests)) {
      throw strings.errors.noFriendRequests;
    }

    // check if the friend request was sent
    if (!user.friendRequests.includes(friend.id)) {
      throw strings.errors.friendRequestNotFound;
    }

    // get the index
    const indexUser = user.friendRequests.indexOf(friend.id);

    // remove the friend request
    user.friendRequests.splice(indexUser, 1);

    // save the user
    await user.update({ friendRequests: user.friendRequests });
  }
};
