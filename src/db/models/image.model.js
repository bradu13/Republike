'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    webPath: DataTypes.STRING
  }, {});
  Image.associate = function (models) {
    models.Image.belongsTo(models.BattlePost);
  };
  return Image;
};
