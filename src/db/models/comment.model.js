'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,

    UserId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    }
  }, {
    paranoid: true
  });
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User);
  };
  return Comment;
};
