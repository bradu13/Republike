const express = require('express');
const router = express.Router();
const BattlePostController = require('../controllers/battlepost.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, validateSchema.battlePostAdd, BattlePostController.add);

module.exports = router;
