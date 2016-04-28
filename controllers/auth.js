const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUsr(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timeStamp
  }, config.secret);
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

      res.json({
        token: tokenForUsr(saved)
      });
    });
  });
}

exports.delete = function(req, res, next) {
  var token = req.headers['authorization'];
  var decoded = jwt.decode(token, config.secret);
  //decode userid as token, attempt to find user
  User.findOne({
      _id: decoded.sub
    })
    .then(function(foundUser) {
      if (foundUser) {
        foundUser.remove(function(err, deleted) {
          if (err) {
            next(err);
          }
          res.status(200);
          res.json(deleted);
        });
      } else {
        res.status(404);
        res.json({
          message: "Not Found"
        });
      }
    })
    .catch(function(error) {
      next(error);
    });
}


exports.signin = function(req, res, next) {
  res.send({
    token: tokenForUsr(req.user)
  });
}