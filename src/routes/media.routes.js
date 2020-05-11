const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/media.controllers');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, MediaController.upload, MediaController.add);

module.exports = router;
