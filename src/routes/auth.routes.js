const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

// Login route
router.post('/login', validateSchema.userValidation, AuthController.login);

// Activate route
router.get('/activate', validateAuth.jwt, AuthController.activate);

// Forgot password route
router.post('/forgot', AuthController.forgot);

// Reset password route
router.post('/reset', validateAuth.jwt, AuthController.reset);

module.exports = router;
