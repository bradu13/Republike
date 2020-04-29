'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BattlePosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      link: {
        type: Sequelize.STRING
      },
      mediaFilePath: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      shares: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      BattleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('BattlePosts');
  }
};
