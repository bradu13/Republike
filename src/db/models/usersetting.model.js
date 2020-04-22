'use strict';

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
    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }
  }, {});
  UserSetting.associate = function (models) {
    models.UserSetting.belongsTo(models.User);
  };
  return UserSetting;
};
