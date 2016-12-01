const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config/config')[process.env.NODE_ENV];

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub:user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res) {

  const emailAddress = req.body.email;
  const password = req.body.password;

  User.findOne({ email: emailAddress}, function (err, result) {
    if (result) {
      return res.status(422).send({
        error: 'Duplicate email address'
      });
    }

    var user = new User({
      email: emailAddress,
      password: password
    });

    user.save(function (err) {
      return res.send(tokenForUser(user));
    })
  });
}

exports.signin = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}