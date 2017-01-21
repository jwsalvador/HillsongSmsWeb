const mongoose = require('mongoose');
const ReceivedMessages = mongoose.model('ReceivedMessage');
const SentMessages = mongoose.model('SentMessage');
const _ = require('lodash');

const sort = require('../helpers/sort');

exports.get = function (req, res) {
  
  ReceivedMessages.find({ campus_code: req.params.code }, function (err, received) {
    if (err) {
      res.send({
        type: 'error',
        data: err
      })
    }
    
    if (received) {
      SentMessages.find({ campus_code: req.params.code }, function (err, sent) {
        
        var fromGroup = _.groupBy(received, 'from');
        var toGroup = _.groupBy(sent, 'to');
        var temp = [];

        for (var key in fromGroup) {
          var to = toGroup[key];
          var from = fromGroup[key];
          var combined = _.concat(from, to);

          temp.push(sort.byDate({ [key]: combined}));
        }

        temp.reverse();

        res.send(temp);
      });
    }
  });
}