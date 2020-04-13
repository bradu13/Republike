const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controllers/auth.controllers');
const validateSchema = require('../middleware/schema');

require('../config/passport')(passport);

// Login route
router.post('/login', validateSchema.userValidation, AuthController.login);

// Forgot route

module.exports = router;
