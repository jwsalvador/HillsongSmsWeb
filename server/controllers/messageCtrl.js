var mongoose = require('mongoose');
var Messages = mongoose.model('Message');
var objHelper = require('../helpers/objectHelper');
var _ = require('lodash');

exports.get = function (req, res) {
    var options = req.params.code ? { campus_codes: req.params.code } : {};

    Messages.find(options, function (err, mes) {
      res.send(mes);
    });
}

exports.save = function (req, res) {
  console.log(req.body);
  
  const body = req.body;
  var messages = [];

  for (var key in req.body.checkbox) {
    if (req.body.checkbox.hasOwnProperty(key) && req.body.checkbox[key]) {
      messages.push(key);
    }
  }

  if (!body._id) {
    const message = new Messages({
      key: body.key,
      value: body.value,
      default: body.default,
      campus_codes: body.campusCodes,
      child_messages: objHelper.getKeys(req.body.checkbox)
    });

    message.save(function (err, result) {
      console.log(err, result);
      res.send(result);
    });
  } else {
    var updatedMessage = {};
    for (var key in req.body) {
      if (key === 'campusCodes') {
        updatedMessage['campus_codes'] = req.body[key];
      } else if (key === 'checkbox') {
        updatedMessage['child_messages'] = objHelper.getKeys(req.body[key]);
      } else {
        updatedMessage[key] = req.body[key];
      }
    }
    // Messages.findByIdAndUpdate(body._id, updatedMessage, { new: true }, function (err, result) {

    // });
    console.log(updatedMessage);
    res.send('success');
  }
}