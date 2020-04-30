const fs = require('fs').promises;
const BattlePostModel = require('../db').BattlePost;
const strings = require('../util/strings');

const add = async (battlePost) => {
  try {

  } catch (error) {
    console.log(error);
    throw strings.errors.addBattlePost;
  }
};

module.exports = {
  add
};
