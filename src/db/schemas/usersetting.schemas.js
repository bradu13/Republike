const Joi = require('@hapi/joi');

module.exports = Joi.object({
  UserId: Joi.string().guid(),

  type: Joi.number().min(1).max(2).required(),

  newFriendBattles: Joi.boolean(),
  newContentPosted: Joi.boolean(),
  friendRequest: Joi.boolean(),
  friendRequestAccepted: Joi.boolean(),
  shareInviteFriendsDiscoverBattle: Joi.boolean(),
  shareInviteFriendsDiscoverContent: Joi.boolean(),
  contentOvertaken: Joi.boolean(),
  grade: Joi.boolean(),
  suggestedBattles: Joi.boolean()
});

