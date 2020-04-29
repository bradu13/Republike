'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    message: DataTypes.TEXT,
    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    },
    BattlePostId: {
      type: DataTypes.INTEGER,
      references: 'battleposts',
      referencesKey: 'id'
    }
  }, {});
  Report.associate = function (models) {
    models.Report.belongsTo(models.User);
  };
  return Report;
};
