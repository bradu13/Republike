'use strict';
module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Theme.associate = function (models) {
    models.Theme.belongsTo(models.Battle);
  };
  return Theme;
};
