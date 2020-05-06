const express = require('express');
const router = express.Router();
const BattlePostController = require('../controllers/battlepost.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, validateSchema.battlePostAdd, BattlePostController.add);

router.get('/:id/', validateAuth.jwt, BattlePostController.load, BattlePostController.get);

router.put('/:id/', validateAuth.jwt, validateSchema.battlePostUpdate, BattlePostController.load, BattlePostController.verify, BattlePostController.update);

router.delete('/:id/', validateAuth.jwt, BattlePostController.load, BattlePostController.verify, BattlePostController.remove);

router.post('/:id/like', validateAuth.jwt, BattlePostController.load, BattlePostController.like);

router.delete('/:id/like', validateAuth.jwt, BattlePostController.load, BattlePostController.dislike);

router.post('/:id/share', validateAuth.jwt, BattlePostController.load, BattlePostController.share);

router.post('/:id/view', validateAuth.jwt, BattlePostController.load, BattlePostController.view);
module.exports = router;
