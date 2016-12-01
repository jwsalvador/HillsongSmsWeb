var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/hillsong-db',
    // db: 'mongodb://hillsonggwadmin:hillsonggw123@ds019886.mlab.com:19886/hillsong-db',
    rootPath: rootPath,
    port: process.env.PORT || 3000,
    secret: '12313rwfsacdft42342eqwafdsvfgrt'
  },
  production: {
    db: 'mongodb://hillsonggwadmin:hillsonggw123@ds019886.mlab.com:19886/hillsong-db',
    rootPath: rootPath,
    port: process.env.PORT || 80,
    secret: process.env.AUTH_SECRET
  }
}