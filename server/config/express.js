const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (app, config){
  const publicPath = express.static(path.join(config.rootPath, 'public'));

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use('/semantic', express.static(path.join(config.rootPath, 'node_modules/semantic-ui-css')));
  app.use('/public', publicPath);
}