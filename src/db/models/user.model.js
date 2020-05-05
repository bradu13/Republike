'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fbToken: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    birthDate: DataTypes.DATEONLY,
    country: DataTypes.STRING,
    biography: DataTypes.INTEGER,
    aureusAmount: DataTypes.INTEGER,
    likeAmount: DataTypes.INTEGER,
    interestedIn: DataTypes.ARRAY(DataTypes.UUID),
    favouritePosts: DataTypes.ARRAY(DataTypes.UUID),
    friends: DataTypes.ARRAY(DataTypes.UUID),
    friendRequests: DataTypes.ARRAY(DataTypes.UUID),
    isActive: DataTypes.BOOLEAN
  }, {
    paranoid: true
  });

  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.afterCreate(async (user) => {
    await sequelize.models.UserSetting.create({ type: 1, UserId: user.id });
    await sequelize.models.UserSetting.create({ type: 2, UserId: user.id });

    if (user.friends === null) {
      user.friends = [];
    }

    if (user.friendRequests === null) {
      user.friendRequests = [];
    }

    if (user.interestedIn === null) {
      user.interestedIn = [];
    }

    if (user.favouritePosts === null) {
      user.favouritePosts = [];
    }

    await user.save();
  });

  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

  User.associate = function (models) {
    models.User.hasMany(models.UserSetting);
    models.User.hasMany(models.Notification);
    models.User.hasMany(models.Battle);
    models.User.hasMany(models.BattlePost);
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.Report);
  };

  return User;
};
