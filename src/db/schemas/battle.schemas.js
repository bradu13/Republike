const Joi = require('@hapi/joi');

const update = Joi.object({
  name: Joi.string().min(3).max(30),

  description: Joi.string(),

  type: Joi.number().min(1).max(4),

  ThemeId: Joi.number()
});

const create = update.keys({
  name: Joi.string().min(3).max(30).required(),
  type: Joi.number().min(1).max(4).required(),
  ThemeId: Joi.number().required()
});

module.exports = {
  update,
  create
};
