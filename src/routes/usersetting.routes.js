const express = require('express');
const router = express.Router();
const UserSettingController = require('../controllers/usersetting.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.put('/', validateAuth.jwt, validateSchema.userSettingUpdate, UserSettingController.updateUserSetting);

module.exports = router;
