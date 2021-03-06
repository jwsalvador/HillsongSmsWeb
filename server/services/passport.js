const passport = require('passport');
const User = require('../models/user');
const config = require('../config/config')[process.env.NODE_ENV];
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// passport assumes that usernameField is username, explicitly say that usernameField is username
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

  User.findOne({email: email}, function (err, user) {
    if (err) { return done(err); }
    else if (!user) { return done(null, false); }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {return done(err)};
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOption, function (payload, done) {

  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(done, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);