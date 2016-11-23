const shell = require('shelljs');

shell.exec('git commit -m ' + process.argv[2]);