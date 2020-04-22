'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      newFriendBattles: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      newContentPosted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      friendRequest: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      friendRequestAccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      shareInviteFriendsDiscoverBattle: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      shareInviteFriendsDiscoverContent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      contentOvertaken: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      grade: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      suggestedBattles: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSettings');
  }
};
