const mongoose = require('mongoose');
const Messages = require("../models/message");
const ReceivedMessages = require("../models/receivedmessage");
const SentMessages = require("../models/sentmessage");

module.exports = function (config) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db);
}