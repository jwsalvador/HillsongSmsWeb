const Server = require('./server/server.js');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


Server.run(env);
// process.env.NODE_ENV = "production";





