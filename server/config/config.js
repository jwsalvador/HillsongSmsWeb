var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  production: {
    db: 'mongodb://jwmwedding:jwmwedding123!@ds061415.mongolab.com:61415/jwm-wedding',
    rootPath: rootPath,
    port: process.env.PORT || 80
  },
  development: {
    db: 'mongodb://jwmwedding:jwmwedding123!@ds061415.mongolab.com:61415/jwm-wedding',
    // db: 'mongodb://localhost:27017/jwm-wedding',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  }
}