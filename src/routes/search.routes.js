const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search.controllers');
const validateAuth = require('../middleware/auth');

router.get('/', validateAuth.jwt, SearchController.get);

module.exports = router;
