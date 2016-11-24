const path = require('path');

module.exports = function (app, config) {
  const indexPath = path.join(config.rootPath, 'index.html');

  app.get('/api', function (_, res) {
    
  });

  app.get('/', function (_, res) { 
    res.sendFile(indexPath) 
  });
}