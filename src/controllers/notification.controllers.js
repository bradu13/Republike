const HTTPStatus = require('http-status-codes');
const MailService = require('../services/mail.services');
const NotificationService = require('../services/notification.services');
const UserSettingService = require('../services/usersetting.services');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

// Get all the notifications
const getAll = async (req, res) => {
  try {
    const notifications = await NotificationService.get(req.user);

    return rSuccess(res, HTTPStatus.OK, notifications);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

// Notify new friend request
const friendRequest = async (user) => {
  const settings = await UserSettingService.getByUserId(user.id);

  // send email
  if (settings.email.friendRequest) {
    MailService.send({
      to: [user.email],
      subject: strings.notifications.friendRequest.title,
      template: 'new-friend-request',
      templateVars: {
        name: user.email
      }
    });
  }

  // create notification
  if (settings.notification.friendRequest) {
    await NotificationService.friendRequest(user);
  }
};

// Notify accepted friend request
const friendRequestAccepted = async (user) => {
  const settings = await UserSettingService.getByUserId(user.id);

  // send email
  if (settings.email.friendRequestAccepted) {
    MailService.send({
      to: [user.email],
      subject: strings.notifications.friendRequestAccepted.title,
      template: 'friend-request-accepted',
      templateVars: {
        name: user.email
      }
    });
  }

  // create notification
  if (settings.notification.friendRequestAccepted) {
    await NotificationService.friendRequestAccepted(user);
  }
};

module.exports = {
  getAll,
  friendRequest,
  friendRequestAccepted
};
