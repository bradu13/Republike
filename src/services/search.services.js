const CommentModel = require('../db').Comment;
const BattleModel = require('../db').Battle;
const BattlePostModel = require('../db').BattlePost;
const strings = require('../util/strings');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const search = async (string) => {
  try {
    const comments = await CommentModel.findAll({
      where: {
        content: {
          [Op.iLike]: `%${string}%`
        }
      }
    });

    const posts = await BattlePostModel.findAll({
      where: {
        title: {
          [Op.iLike]: `%${string}%`
        }
      }
    });

    const battles = await BattleModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${string}%`
        }
      }
    });

    return {
      comments,
      posts,
      battles
    };
  } catch (error) {
    console.log(error);
    throw strings.errors.search;
  }
};

module.exports = {
  search
};
