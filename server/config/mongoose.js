var mongoose = require('mongoose');
var Messages = require("../models/message");

module.exports = function (config) {
  mongoose.connect(config.db);
}