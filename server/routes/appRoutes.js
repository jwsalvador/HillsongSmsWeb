const path = require('path');
const message = require('../controllers/messageCtrl');
const inbox = require('../controllers/inboxCtrl');
const auth = require('../controllers/userCtrl');
const passport = require('passport');
const passportService = require('../services/passport');

// Set session to false to not create cookie based authentication
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {

  app.post('/auth/signin', requireSignin, auth.signin);

  app.post('/auth/signup', auth.signup);

  app.get('/api/messages', message.get);

  app.get('/api/messages/:code', message.get);

  app.post('/api/message', message.save);

  app.get('/api/inbox/:code', inbox.get);

  app.get('*', function (req, res) {
    res.sendFile(path.join(config.rootPath, 'index.html'));
  });
}