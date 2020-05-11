const Joi = require('@hapi/joi');

const update = Joi.object({
  title: Joi.string().min(3).max(30),
  FileId: Joi.number(),
  BattleId: Joi.number()
});

const create = update.keys({
  title: Joi.string().min(3).max(30).required(),
  FileId: Joi.number().required(),
  BattleId: Joi.number().required()
});

module.exports = {
  update,
  create
};
