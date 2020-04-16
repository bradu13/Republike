const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

// Add new user
router.post('/', validateSchema.userAdd, UserController.add);

// Get user by id
router.get('/:id/', validateAuth.jwt, UserController.get);

// Update user by id
router.put('/:id/', validateAuth.jwt, validateSchema.userUpdate, UserController.update);

// Delete user by id
router.delete('/:id/', validateAuth.jwt, UserController.remove);

module.exports = router;
