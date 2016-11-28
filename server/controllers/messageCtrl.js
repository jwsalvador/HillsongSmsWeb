var mongoose = require('mongoose');
var Messages = mongoose.model('Message');
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

  if (!body._id) {
    // const message = new Messages({
    //   key: body.key,
    //   value: body.value,
    //   default: body.default,
    //   campus_codes: body.codes,
    //   child_messages: 
    // });
    // message.

    for (var key in req.body.checkbox) {
      if (p.hasOwnProperty(key)) {
        console.log(key + " -> " + p[key]);
      }
    }
    // const children = _.filter(req.body.checkbox, function (val, key) {
    //   return key;
    // });

    // console.log(children);
  }
  res.send('success');
}