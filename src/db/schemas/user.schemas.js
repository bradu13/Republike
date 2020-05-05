const Joi = require('@hapi/joi');

const update = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(30),

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

  isActive: Joi.boolean()
});

const create = update.keys({
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required()
});

module.exports = {
  update,
  create
};
