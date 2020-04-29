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

const view = async (battle, user) => {
  if (!Array.isArray(battle.views)) {
    battle.views = [];
  }

  if (battle.views.includes(user.id)) {
    return null;
  }

  battle.views.push(user.id);

  await battle.update({ views: battle.views });
};

const share = async (battle, user) => {
  if (!Array.isArray(battle.shares)) {
    battle.shares = [];
  }

  if (battle.shares.includes(user.id)) {
    return null;
  }

  battle.shares.push(user.id);

  await battle.update({ shares: battle.shares });
};

module.exports = {
  getAll,
  getById,
  add,
  view,
  share
};
