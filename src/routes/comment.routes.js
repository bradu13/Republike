const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, validateSchema.commentAdd, CommentController.add);

router.get('/:id', validateAuth.jwt, CommentController.load, CommentController.get);

router.put('/:id', validateAuth.jwt, validateSchema.commentUpdate, CommentController.load, CommentController.verify, CommentController.update);

router.delete('/:id', validateAuth.jwt, CommentController.load, CommentController.verify, CommentController.remove);

module.exports = router;
