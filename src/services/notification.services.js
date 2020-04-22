const NotificationModel = require('../db/').Notification;
const strings = require('../util/strings');

const friendRequest = async (user) => {
  try{
    await NotificationModel.create({
      type: 2,
      title: strings.notifications.friendRequest.title,
      description: strings.notifications.friendRequest.description,
      UserId: user.id
    });
  }catch(error){
    throw strings.errors.notificationCreateError;
  }
};

module.exports = {
  friendRequest
};
