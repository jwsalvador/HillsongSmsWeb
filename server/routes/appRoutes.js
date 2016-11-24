var path = require('path');
var message = require('../controllers/messageCtrl');

module.exports = function (app, config) {

  app.get('/api/messages', message.get);

  app.get('/api/messages/:code', message.get);

  app.get('*', function (req, res) {
    res.sendFile(path.join(config.rootPath, 'index.html'));
  });
}