'use strict';
const bcrypt = require('bcrypt');
const UserSetting = require('./../index').UserSetting;

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
    isDeleted: DataTypes.BOOLEAN
  }, {});

  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
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
    User.hasOne(UserSetting);
  };

  return User;
};
