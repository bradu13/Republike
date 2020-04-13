const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

// Add new user
router.post('/', validateSchema.userValidation, UserController.add);

// Get user by id
router.post('/:id/', validateAuth, (req, res) => {
  return res.status(200).send(req.user);
});

module.exports = router;
