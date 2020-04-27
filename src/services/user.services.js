const UserModel = require('../db').User;
const strings = require('../util/strings');

// Add new user
const add = async (user) => {
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
};

// Get user by filter
const get = async (filter) => {
  try {
    return await UserModel.findOne(filter);
  } catch (error) {
    throw strings.errors.getUser;
  }
};

// Get user by id
const getById = async (id) => {
  try {
    return await UserModel.findOne({ where: { id } });
  } catch (error) {
    throw strings.errors.getUser;
  }
};

// Update user by id
const update = async (id, fields) => {
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
};

// Add friend
const addFriend = async (user, friend) => {
  // check if the friend is active
  if (!friend.isActive) {
    throw strings.errors.inactiveFriend;
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
};

// Delete friend
const deleteFriend = async (user, friend) => {
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
};

// Add friend request
const addFriendRequest = async (user, friend) => {
  // check if the friend is active
  if (!friend.isActive) {
    throw strings.errors.inactiveFriend;
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
};

// Delete friend request
const deleteFriendRequest = async (user, friend) => {
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
};

// Accept friend request
const acceptFriendRequest = async (user, friend) => {
  // check if the friend is active
  if (!friend.isActive) {
    throw strings.errors.inactiveFriend;
  }

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

  // we have to check both ways
  if (Array.isArray(friend.friendRequests)) {
    if (friend.friendRequests.includes(user.id)) {
      const indexFriend = friend.friendRequests.indexOf(user.id);
      friend.friendRequests.splice(indexFriend, 1);
    }
  }

  // normalize arrays
  if (!Array.isArray(user.friends)) {
    user.friends = [];
  }
  if (!Array.isArray(friend.friends)) {
    friend.friends = [];
  }

  // make the connection
  user.friends.push(friend.id);
  friend.friends.push(user.id);

  // save the users
  await user.update({ friendRequests: user.friendRequests, friends: user.friends });
  await friend.update({ friends: friend.friends, friendRequests: friend.friendRequests });
};

module.exports = {
  add,
  get,
  getById,
  update,
  addFriend,
  deleteFriend,
  addFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest
};
