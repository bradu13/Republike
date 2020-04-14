const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controllers');
const validateSchema = require('../middleware/schema');


// Login route
router.post('/login', validateSchema.userValidation, AuthController.login);

// Forgot route

module.exports = router;
