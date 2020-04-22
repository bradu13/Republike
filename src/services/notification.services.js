const NotificationModel = require('../db/').Notification;
const strings = require('../util/strings');

const get = async (user) => {
  try {
    return await NotificationModel.findAll({ where: { UserId: user.id } });
  } catch (error) {
    throw strings.errors.notificationGet;
  }
};

const friendRequest = async (user) => {
  try {
    await NotificationModel.create({
      type: 2,
      title: strings.notifications.friendRequest.title,
      description: strings.notifications.friendRequest.description,
      UserId: user.id
    });
  } catch (error) {
    throw strings.errors.notificationCreateError;
  }
};

module.exports = {
  get,
  friendRequest
};
