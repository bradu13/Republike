const UserService = require('../services/user.services');
const MailService = require('../services/mail.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const jwt = require('jsonwebtoken');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const add = async (req, res) => {
  try {
    const user = await UserService.add({
      email: req.body.email,
      password: req.body.password
    });

    const url = req.protocol + '://' + req.get('host');
    const activateToken = jwt.sign(JSON.parse(JSON.stringify({
      id: user.id
    })), process.env.JWT, { expiresIn: 86400 * 30 });

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

const get = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    return rSuccess(res, HTTPStatus.OK, user);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const update = async (req, res) => {
  try {
    const user = await UserService.update(req.params.id, req.body);

    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    return rSuccess(res, HTTPStatus.OK, user);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    user.destroy();

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    return rSuccess(res, HTTPStatus.OK, user.friends);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    await UserService.addFriend(req.user, friend);

    return rSuccess(res, HTTPStatus.CREATED, strings.friends.created);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    await UserService.deleteFriend(req.user, friend);

    return rSuccess(res, HTTPStatus.OK, strings.friends.removed);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    return rSuccess(res, HTTPStatus.OK, user.friendRequests);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const addFriendRequest = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    await UserService.addFriendRequest(req.user, friend);

    return rSuccess(res, HTTPStatus.CREATED, strings.friends.createdRequest);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const deleteFriendRequest = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    const friend = await UserService.getById(req.body.id);

    if (!friend || !user) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noUser);
    }

    await UserService.deleteFriendRequest(req.user, friend);

    return rSuccess(res, HTTPStatus.CREATED, strings.friends.removedRequest);
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
  deleteFriendRequest
};
