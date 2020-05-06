const Joi = require('@hapi/joi');

const update = Joi.object({
  message: Joi.string().min(10),
  BattlePostId: Joi.number()
});

const create = update.keys({
  message: Joi.string().min(10).required(),
  BattlePostId: Joi.number().required()
});

module.exports = {
  update,
  create
};
