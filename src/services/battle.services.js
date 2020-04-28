const BattleModel = require('../db').Battle;
const strings = require('../util/strings');

const getAll = async () => {
  try {
    return await BattleModel.findAll();
  } catch (error) {
    throw strings.errors.getBattle;
  }
};

const getById = async (id) => {
  try {
    return await BattleModel.findOne({ where: { id } });
  } catch (error) {
    throw strings.errors.getBattle;
  }
};

const add = async (battle) => {
  try {
    return await BattleModel.create(battle);
  } catch (error) {
    throw strings.errors.addBattle;
  }
};

module.exports = {
  getAll,
  getById,
  add
};
