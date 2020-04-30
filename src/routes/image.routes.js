const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controllers');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, ImageController.upload, ImageController.add);

module.exports = router;
