const express = require('express');
const router = express.Router();
const rSuccess = require('../util/success');
const rError = require('../util/error');

/* GET home page. */
router.get('/', function(req, res) {
  return rSuccess(res,200,'Hi');
});

module.exports = router;
