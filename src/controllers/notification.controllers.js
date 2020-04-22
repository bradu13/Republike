const MailService = require('../services/mail.services');
const NotificationService = require('../services/notification.services');
const UserSettingService = require('../services/usersetting.services');
const strings = require('../util/strings');

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
  friendRequest
};
