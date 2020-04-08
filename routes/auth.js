const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../db/index').User;
const strings = require('../util/strings');
const rError = require('../util/error');
const rSuccess = require('../util/success');

require('../config/passport')(passport);

router.post('/login', async (req, res) => {

    try{
        const user = await User.findOne({where: {username: req.body.username}});

        if (!user) {
            return rError(res, 401, strings.login.notFound);
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err) {
                const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT, {expiresIn: 86400 * 30});

                jwt.verify(token, process.env.JWT, function(err, data){
                    console.log(err, data);
                });

                return rSuccess(res, 200, {token: 'JWT ' + token});
            }
            return rError(res,401, strings.login.wrongPassword);
        });

    }catch (error){
        return rError(res, 400, error);
    }
});

module.exports = router;
