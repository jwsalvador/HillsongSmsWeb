var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  key: String,
  value: String,
  default: String,
  level: Number,
  campus_codes: [String],
  child_messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

mongoose.model('Message', schema);

