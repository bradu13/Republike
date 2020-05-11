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

  const owner = await UserService.getById(post.UserId);

  owner.aureusAmount += 10;
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

  const owner = await UserService.getById(post.UserId);

  owner.aureusAmount -= 10;
  await owner.save();

  const indexLike = post.likes.indexOf(user.id);
  post.likes.splice(indexLike, 1);

  await post.update({ likes: post.likes });
};

const share = async (req) => {
  const post = req.battlepost;
  const user = req.user;

  if (post.shares.includes(user.id)) {
    return;
  }

  post.shares.push(user.id);
  await post.update({ shares: post.shares });
};

const view = async (req) => {
  const post = req.battlepost;
  const user = req.user;

  if (post.views.includes(user.id)) {
    return;
  }

  post.views.push(user.id);
  await post.update({ views: post.views });
};

module.exports = {
  add,
  get,
  update,
  remove,
  like,
  dislike,
  share,
  view
};
