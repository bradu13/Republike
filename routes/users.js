const express = require('express');
const router = express.Router();
const User = require('../db/index').User;
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

// Add new user
router.post('/', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return rError(res,400,strings.register.noData);
  }

  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    return rSuccess(res, 201, user);
  }catch(error){
    return rError(res, 400, error);
  }

});

module.exports = router;
