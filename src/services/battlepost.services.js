const BattlePostModel = require('../db').BattlePost;
const strings = require('../util/strings');

const add = async (battlePost) => {
  try {
    return await BattlePostModel.create(battlePost);
  } catch (error) {
    throw strings.errors.addBattlePost;
  }
};

const get = async(id) => {
  try{
    return await BattlePostModel.findOne({where: {id}});
  } catch (error) {
    throw strings.errors.getBattlePost;
  }
};

const update = async (post,req) => {
  if(post.UserId !== req.user.id){
    throw strings.errors.noBattlePostEditPermission;
  }

  try{
    await post.update(req.body);
  } catch (error){
    throw strings.errors.updateBattlePost;
  }
};

const remove = async (post,req) => {
  if(post.UserId !== req.user.id){
    throw strings.errors.noBattlePostDeletePermission;
  }

  try{
    await post.destroy();
  } catch (error){
    throw strings.errors.deleteBattlePost;
  }
};

module.exports = {
  add,
  get,
  update,
  remove
};
