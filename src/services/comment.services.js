const CommentModel = require('../db').Comment;
const strings = require('../util/strings');

const add = async (comment) => {
  try {
    return await CommentModel.create(comment);
  } catch (error) {
    console.log(error);
    throw strings.errors.addComment;
  }
};

const get = async (id) => {
  try {
    return await CommentModel.findOne({ where: { id } });
  } catch (error) {
    throw strings.errors.getComment;
  }
};

const update = async (req) => {
  const comment = req.comment;

  try {
    await comment.update(req.body);
  } catch (error) {
    throw strings.errors.updateComment;
  }
};

const remove = async (req) => {
  const comment = req.comment;

  try {
    await comment.destroy();
  } catch (error) {
    throw strings.errors.deleteComment;
  }
};

module.exports = {
  add,
  get,
  update,
  remove
};
