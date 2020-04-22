const HTTPStatus = require('http-status-codes');
const MailService = require('../services/mail.services');
const NotificationService = require('../services/notification.services');
const UserSettingService = require('../services/usersetting.services');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const getAll = async (req, res) => {
  try {
    const notifications = await NotificationService.get(req.user);

    return rSuccess(res, HTTPStatus.OK, notifications);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const friendRequest = async (user) => {
  const settings = await UserSettingService.getByUserId(user.id);

  // send email
  if (settings.email.friendRequest) {
    MailService.send({
      to: [user.email],
      subject: strings.email.newUser,
      template: 'new-friend-request',
      templateVars: {
        name: user.email
      }
    });
  }

  if (settings.notification.friendRequest) {
    await NotificationService.friendRequest(user);
  }
};

module.exports = {
  getAll,
  friendRequest
};
