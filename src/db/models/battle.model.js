'use strict';
module.exports = (sequelize, DataTypes) => {
  const Battle = sequelize.define('Battle', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    likeAmount: DataTypes.INTEGER,
    postAmount: DataTypes.INTEGER,

    shares: DataTypes.ARRAY({
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }),

    views: DataTypes.ARRAY({
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }),

    ThemeId: {
      type: DataTypes.INTEGER,
      references: 'themes',
      referencesKey: 'id'
    },

    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }
  }, {
    paranoid: true
  });

  Battle.afterCreate(async battle => {
    battle.views = [];
    battle.shares = [];
    await battle.save();
  });

  Battle.associate = function (models) {
    models.Battle.belongsTo(models.User);
    models.Battle.hasOne(models.Theme);
    models.Battle.hasMany(models.BattlePost);
  };

  return Battle;
};
