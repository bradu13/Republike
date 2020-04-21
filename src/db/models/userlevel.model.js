'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLevel = sequelize.define('UserLevel', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    totalPoints: DataTypes.INTEGER
  }, {});

  UserLevel.associate = function (models) {
    // associations can be defined here
  };

  return UserLevel;
};
