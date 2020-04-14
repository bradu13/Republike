'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      fbToken: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      country: {
        type: Sequelize.STRING
      },
      biography: {
        type: Sequelize.TEXT
      },
      aureusAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likeAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      interestedIn: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      favouritePosts: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      friends: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      friendRequests: {
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
