const Joi = require('@hapi/joi');

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  access_token: [
    Joi.string(),
    Joi.number()
  ]
});
