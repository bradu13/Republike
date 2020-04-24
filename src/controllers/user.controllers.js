const NotificationController = require('../controllers/notification.controllers');
const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const jwt = require('jsonwebtoken');
const rError = require('../util/error');
const rSuccess = require('../util/success');

// Add user
const add = async (req, res) => {
  try {
    // Call the service
    const user = await UserService.add({
      email: req.body.email,
      password: req.body.password
    });

    // Create the activation url
    const url = req.protocol + '://' + req.get('host');
    const activateToken = jwt.sign(JSON.parse(JSON.stringify({
      id: user.id
    })), process.env.JWT, { expiresIn: 86400 * 30 });

    // Send to mail
    MailService.send({
      to: [user.email],
      subject: strings.email.newUser,
      template: 'new-user',
      templateVars: {
        name: user.email,
        url: `${url}/auth/activate?token=${activateToken}`
      }
    });

    return rSuccess(res, HTTPStatus.CREATED, user);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Get user
const get = async (req, res) => {
  try {
    // Call the service
    const user = await UserService.getById(req.params.id);

    // Validate
    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    return rSuccess(res, HTTPStatus.OK, user);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Update user
const update = async (req, res) => {
  try {
    // Call the service
    const user = await UserService.update(req.params.id, req.body);

    // Validate
    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Send the user
    return rSuccess(res, HTTPStatus.OK, user);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Remove the user
const remove = async (req, res) => {
  try {
    // Call the service
    const user = await UserService.getById(req.params.id);

    // Validate
    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Delete and send message
    user.destroy();

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Get List of Friends
const getFriends = async (req, res) => {
  try {
    // Call the service
    const user = await UserService.getById(req.params.id);

    // Validate
    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Send
    return rSuccess(res, HTTPStatus.OK, user.friends);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Add new friend
const addFriend = async (req, res) => {
  try {
    // Call the service and retrieve users
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    // Validate
    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Call the service
    await UserService.addFriend(user, friend);

    // Send
    return rSuccess(res, HTTPStatus.CREATED, strings.friends.created);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Delete friend
const deleteFriend = async (req, res) => {
  try {
    // Call the service and retrieve users
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    // Validate
    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Call the service to delete the friend relationship
    await UserService.deleteFriend(user, friend);

    // Send message
    return rSuccess(res, HTTPStatus.OK, strings.friends.removed);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Get friend requests
const getFriendRequests = async (req, res) => {
  try {
    // Get the user
    const user = await UserService.getById(req.params.id);

    // Validate
    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Send
    return rSuccess(res, HTTPStatus.OK, user.friendRequests);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Add friend request
const addFriendRequest = async (req, res) => {
  try {
    // Get the users
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    // Validate
    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Add the friend request and then notify the user
    await UserService.addFriendRequest(user, friend);
    await NotificationController.friendRequest(user);

    // Send message
    return rSuccess(res, HTTPStatus.CREATED, strings.friends.createdRequest);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Delete friend request
const deleteFriendRequest = async (req, res) => {
  try {
    // Get the users
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    // Validate
    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Delete the friend request
    await UserService.deleteFriendRequest(user, friend);

    // Send message
    return rSuccess(res, HTTPStatus.CREATED, strings.friends.removedRequest);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Accept friend request
const acceptFriendRequest = async (req, res) => {
  try {
    // Get the users
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    // Validate
    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    // Accepted the friend request
    await UserService.acceptFriendRequest(user, friend);
    await NotificationController.acceptFriendRequest(friend);

    // Send message
    return rSuccess(res, HTTPStatus.OK, strings.friends.acceptedRequest);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  get,
  update,
  remove,
  getFriends,
  addFriend,
  deleteFriend,
  getFriendRequests,
  addFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest
};
