const express = require('express');
const router = express.Router();
const BattlePostController = require('../controllers/battlepost.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, validateSchema.battlePostAdd, BattlePostController.add);

router.get('/:id/', validateAuth.jwt, BattlePostController.get);

router.put('/:id/', validateAuth.jwt, validateSchema.battlePostUpdate, BattlePostController.update);

router.delete('/:id/', validateAuth.jwt, BattlePostController.remove);

module.exports = router;
