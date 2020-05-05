const BattlePostModel = require('../db').BattlePost;
const UserService = require('./user.services');
const strings = require('../util/strings');

const add = async (battlePost) => {
  try {
    return await BattlePostModel.create(battlePost);
  } catch (error) {
    throw strings.errors.addBattlePost;
  }
};

const get = async (id) => {
  try {
    return await BattlePostModel.findOne({ where: { id } });
  } catch (error) {
    throw strings.errors.getBattlePost;
  }
};

const update = async (req) => {
  const post = req.battlepost;

  try {
    await post.update(req.body);
  } catch (error) {
    throw strings.errors.updateBattlePost;
  }
};

const remove = async (req) => {
  const post = req.battlepost;

  try {
    await post.destroy();
  } catch (error) {
    throw strings.errors.deleteBattlePost;
  }
};

const like = async (req) => {
  const post = req.battlepost;
  const user = req.user;

  if (post.likes.includes(user.id)) {
    throw strings.errors.alreadyLiked;
  }

  const owner = await UserService.get(post.UserId);

  owner.likeAmount += 1;
  await owner.save();

  post.likes.push(user.id);
  await post.update({ likes: post.likes });
};

const dislike = async (req) => {
  const post = req.battlepost;
  const user = req.user;

  if (!post.likes.includes(user.id)) {
    throw strings.errors.noLike;
  }

  const owner = await UserService.get(post.UserId);

  owner.likeAmount -= 1;
  await owner.save();

  const indexLike = post.likes.indexOf(user.id);
  post.likes.splice(indexLike, 1);

  await post.update({ likes: post.likes });
};

module.exports = {
  add,
  get,
  update,
  remove,
  like,
  dislike
};
