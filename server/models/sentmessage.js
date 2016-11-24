var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  to: String,
  sent_at: Date,
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  expected_response: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  campus_code: String
});

mongoose.model("SentMessage", schema);