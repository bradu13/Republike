const CommentService = require('../services/comment.services');
const HTTPStatus = require('http-status-codes');
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

const load = async (req, res, next) => {
  try {
    const comment = await CommentService.get(req.params.id);

    if (!comment) {
      return rError(res, HTTPStatus.NOT_FOUND, strings.errors.noComment);
    }

    req.comment = comment;

    return next();
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const verify = async (req, res, next) => {
  if (req.comment.UserId !== req.user.id) {
    return rError(res, HTTPStatus.UNAUTHORIZED, strings.errors.noCommentEditPermission);
  }
  next();
};

const add = async (req, res) => {
  const comment = req.body;
  comment.UserId = req.user.id;

  try {
    const result = await CommentService.add(comment);

    return rSuccess(res, HTTPStatus.CREATED, result);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const get = async (req, res) => {
  try {
    return rSuccess(res, HTTPStatus.OK, req.comment);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const update = async (req, res) => {
  try {
    await CommentService.update(req);

    return rSuccess(res, HTTPStatus.OK, req.comment);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

const remove = async (req, res) => {
  try {
    await CommentService.remove(req);

    return rSuccess(res, HTTPStatus.OK, strings.delete.success);
  } catch (error) {
    return rError(res, HTTPStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  add,
  load,
  get,
  verify,
  remove,
  update
};
