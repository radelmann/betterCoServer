const Auth = require('./controllers/auth');
const Comment = require('./controllers/comment');
const passportService = require('./services/passport');
const passport = require('passport');
var sanitize = require('mongo-sanitize');

var cleanInput = function(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

const requireAuth = passport.authenticate('jwt', {session : false});
const requireSignin = passport.authenticate('local', {session : false});

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.status(200).json({status:"OK"});
  });

  //protected comment routes
  app.get('/comment', requireAuth, Comment.get);
  app.post('/comment', cleanInput, requireAuth, Comment.post);
  app.delete('/comment/:id', requireAuth, Comment.delete);

  //delete user route 
  app.delete('/user', Auth.delete);

  //auth routes
  app.post('/signup', cleanInput, Auth.signup);
  app.post('/signin', cleanInput, requireSignin, Auth.signin);
}