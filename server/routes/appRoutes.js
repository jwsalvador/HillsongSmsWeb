const path = require('path');
const message = require('../controllers/messageCtrl');
const inbox = require('../controllers/inboxCtrl');

module.exports = function (app, config) {

  app.get('/api/messages', message.get);

  app.get('/api/messages/:code', message.get);

  app.post('/api/message', message.save);

  app.get('/api/inbox/:code', inbox.get);

  app.get('*', function (req, res) {
    res.sendFile(path.join(config.rootPath, 'index.html'));
  });
}