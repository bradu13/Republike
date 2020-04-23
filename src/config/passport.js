const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../db').User;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT
  };
  passport.use('jwt', new JwtStrategy(opts, (jwtPayload, done) => {
    User
      .findByPk(jwtPayload.id)
      .then((user) => { return done(null, user); })
      .catch((error) => { console.log(error); return done(error, false); });
  }));
};
