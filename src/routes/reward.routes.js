const express = require('express');
const router = express.Router();
const RewardController = require('../controllers/reward.controllers');
const validateAuth = require('../middleware/auth');

router.get('/daily', validateAuth.jwt, RewardController.daily);

router.post('/convert/:aureus', validateAuth.jwt, RewardController.convert);

module.exports = router;
