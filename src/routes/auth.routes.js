const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controllers/auth.controllers');

require('../config/passport')(passport);

router.post('/login', AuthController.login);

module.exports = router;
