const NotificationModel = require('../db/').Notification;
const strings = require('../util/strings');

// Get notification by user.id
const get = async (user) => {
  try {
    return await NotificationModel.findAll({ where: { UserId: user.id } });
  } catch (error) {
    throw strings.errors.notificationGet;
  }
};

// Create the friend request notification
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
