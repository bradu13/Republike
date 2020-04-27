'use strict';
module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Theme.associate = function (models) {
    // associations can be defined here
  };
  return Theme;
};
