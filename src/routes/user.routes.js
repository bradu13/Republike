const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');

// Add new user
router.post('/', UserController.add);

module.exports = router;
