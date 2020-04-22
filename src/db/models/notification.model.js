'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }
  }, {});

  Notification.associate = function (models) {
    models.Notification.belongsTo(models.User);
  };

  return Notification;
};
