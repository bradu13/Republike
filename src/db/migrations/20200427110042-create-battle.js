'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Battles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      ThemeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      likeAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      postAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      shares: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.UUID)
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
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Battles');
  }
};
