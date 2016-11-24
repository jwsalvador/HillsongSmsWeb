var mongoose = require('mongoose');
var Messages = mongoose.model('Message');

exports.get = function (req, res) {
    var options = req.params.code ? { campus_codes: req.params.code } : {};

    Messages.find(options, function (err, mes) {
      res.send(mes);
    });
}