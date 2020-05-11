'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    name: DataTypes.STRING,
    webPath: DataTypes.STRING
  }, {});
  File.associate = function (models) {
    models.File.belongsTo(models.BattlePost);
  };
  return File;
};
