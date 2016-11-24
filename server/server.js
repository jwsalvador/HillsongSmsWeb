const path = require('path');
const express = require('express');

module.exports = {
  run: function (env) {
    const app = express();
    const config = require('./config/config')[env];
    
    require('./config/webpack')(app);
    require('./config/mongoose')(config);
    require('./config/express')(app, config);
    require('./routes/appRoutes')(app, config);

    app.listen(config.port, function (err) {
      console.log(`Listening at http://localhost:${config.port} on ${process.env.NODE_ENV}`);
    });

    return app;
  }
}
