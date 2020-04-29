const express = require('express');
const router = express.Router();
const BattleController = require('../controllers/battle.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.get('/', validateAuth.jwt, BattleController.getAll);

router.post('/', validateAuth.jwt, validateSchema.battleAdd, BattleController.add);

router.put('/:id', validateAuth.jwt, validateSchema.battleUpdate, BattleController.verify, BattleController.update);

router.delete('/:id', validateAuth.jwt, BattleController.verify, BattleController.remove);

router.post('/:id/view', validateAuth.jwt, BattleController.verify, BattleController.view);

router.post('/:id/share', validateAuth.jwt, BattleController.verify, BattleController.share);

module.exports = router;
