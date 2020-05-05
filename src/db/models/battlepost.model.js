'use strict';
module.exports = (sequelize, DataTypes) => {
  const BattlePost = sequelize.define('BattlePost', {
    title: DataTypes.STRING,
    ImageId: {
      type: DataTypes.INTEGER,
      references: 'images',
      referencesKey: 'id'
    },

    likes: DataTypes.ARRAY({
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }),

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

    comments: DataTypes.ARRAY({
      type: DataTypes.INTEGER,
      references: 'comments',
      referencesKey: 'id'
    }),

    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    },

    BattleId: {
      type: DataTypes.INTEGER,
      references: 'battles',
      referencesKey: 'id'
    }
  }, {
    paranoid: true
  });

  BattlePost.afterCreate(async post => {
    post.views = [];
    post.likes = [];
    post.shares = [];
    post.comments = [];
  });

  BattlePost.associate = function (models) {
    models.BattlePost.belongsTo(models.User);
    models.BattlePost.belongsTo(models.Battle);
    models.BattlePost.hasMany(models.Comment);
    models.BattlePost.hasOne(models.Image, {
      as: 'image',
      foreignKeyConstraint: true
    });
  };
  return BattlePost;
};