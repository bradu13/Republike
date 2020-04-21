'use strict';
const User = require('./../index').User;

module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define('UserSetting', {
    type: DataTypes.INTEGER,
    newFriendBattles: DataTypes.BOOLEAN,
    newContentPosted: DataTypes.BOOLEAN,
    friendRequest: DataTypes.BOOLEAN,
    friendRequestAccepted: DataTypes.BOOLEAN,
    shareInviteFriendsDiscoverBattle: DataTypes.BOOLEAN,
    shareInviteFriendsDiscoverContent: DataTypes.BOOLEAN,
    contentOvertaken: DataTypes.BOOLEAN,
    grade: DataTypes.BOOLEAN,
    suggestedBattles: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }
  }, {});
  UserSetting.associate = function (models) {
    UserSetting.belongsTo(User);
  };
  return UserSetting;
};
