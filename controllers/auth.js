const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUsr(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
        error: 'email and/or password required'
      });
  }

  User.findOne({
    email: email
  }, function(err, found) {
    if (err) {
      return next(err);
    }

    if (found) {
      return res.status(422).send({
        error: 'email is in use'
      });
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err, saved) {
      if (err) {
        return next(err);
      }

      res.json({token: tokenForUsr(saved)});
    });
  });
}

exports.signin = function(req,res,next) {
  res.send({token:tokenForUsr(req.user)});
}