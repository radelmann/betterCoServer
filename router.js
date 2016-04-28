const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session : false});
const requireSignin = passport.authenticate('local', {session : false});

module.exports = function(app) {
  //protected comment routes
  app.get('/comment', requireAuth,, comment.get);
  app.post('/comment', requireAuth,, cleanInput, comment.post);
  app.delete('/comment/:id', requireAuth, comment.delete);

  //auth routes
  app.post('/signup', Auth.signup);
  app.post('/signin', requireSignin, Auth.signin);
}