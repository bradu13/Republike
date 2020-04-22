const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controllers');
const validateAuth = require('../middleware/auth');

// Get all notifications for req.user
router.get('/', validateAuth.jwt, NotificationController.getAll);

module.exports = router;
