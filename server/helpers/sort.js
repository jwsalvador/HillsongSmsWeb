exports.byDate = function (obj) {
  var sorted = {};

  for (var key in obj) {
    var arr = obj[key];

    var temp = arr.sort(function (o1, o2) {
      var o1date = o1.date_received || o1.sent_at;
      var o2date = o2.date_received || o2.sent_at;
      return new Date(o1date) - new Date(o2date);
    });

    var t = [];

    for (var i = 0; i < temp.length; i++) {
      if (i === 0) {
        t.push(temp[i]);
        continue;
      }

      if ((t[i - 1].toObject().hasOwnProperty('to') && temp[i].toObject().hasOwnProperty('to')) 
       || (t[i - 1].toObject().hasOwnProperty('from') && temp[i].toObject().hasOwnProperty('from')) ) {
        t[i] = temp[i + 1];
        t[++i] = temp[i];
      } else {
        t[i] = temp[i];
      }
    }

    sorted = {
      [key]: t
    };
  }
  return sorted;
}