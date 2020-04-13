const Joi = require('@hapi/joi');

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  fbToken: [
    Joi.string(),
    Joi.number()
  ],

  fullName: Joi.string()
    .alphanum()
    .min(2)
    .max(25),

  gender: Joi.number()
    .min(1)
    .max(3),

  birthDate: Joi.date(),

  country: Joi.string(),

  biography: Joi.string()
    .max(500),

  aureusAmount: Joi.number()
    .min(0),

  likeAmount: Joi.number()
    .min(0),

  interestedIn: Joi.array()
    .items(Joi.object({
      themeId: Joi.string().required()
    })),

  favouritePosts: Joi.array()
    .items(Joi.object({
      battlePostId: Joi.string().required()
    })),

  friends: Joi.array()
    .items(Joi.object({
      userId: Joi.string().required()
    })),

  friendRequests: Joi.array()
    .items(Joi.object({
      userId: Joi.string().required()
    })),

  isActive: Joi.boolean(),

  isDeleted: Joi.boolean(),

  access_token: [
    Joi.string(),
    Joi.number()
  ]
});
