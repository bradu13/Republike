const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Add new user
router.post('/', UserController.add);

module.exports = router;
