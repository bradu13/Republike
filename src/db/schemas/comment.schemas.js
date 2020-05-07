const Joi = require('@hapi/joi');

const update = Joi.object({
  content: Joi.string(),
  BattlePostId: Joi.number()
});

const create = update.keys({
  content: Joi.string().required(),
  BattlePostId: Joi.number().required()
});

module.exports = {
  update,
  create
};
