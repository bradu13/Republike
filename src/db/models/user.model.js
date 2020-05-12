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
    isActive: DataTypes.BOOLEAN,
    lastReward: DataTypes.DATEONLY
  }, {
    paranoid: true
  });

  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
    if (user.friends == null) {
      user.friends = [];
    }
    if (user.friendRequests == null) {
      user.friendRequests = [];
    }
    if (user.interestedIn == null) {
      user.interestedIn = [];
    }
    if (user.favouritePosts == null) {
      user.favouritePosts = [];
    }
  });

  User.afterCreate(async (user) => {
    await sequelize.models.UserSetting.create({ type: 1, UserId: user.id });
    await sequelize.models.UserSetting.create({ type: 2, UserId: user.id });
  });

  User.afterDestroy(async (user) => {
    const setting1 = await sequelize.models.UserSetting.findOne({ where: { type: 1, UserId: user.id } });
    const setting2 = await sequelize.models.UserSetting.findOne({ where: { type: 2, UserId: user.id } });

    await setting1.destroy();
    await setting2.destroy();
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
