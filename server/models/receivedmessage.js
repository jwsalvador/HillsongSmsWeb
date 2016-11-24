var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  date_received: Date,
  message_id: String,
  from: String,
  message_body: String,
  campus_code: String
});

mongoose.model("ReceivedMessage", schema);