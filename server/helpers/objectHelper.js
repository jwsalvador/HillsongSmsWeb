exports.getKeys = function (objArray) {
  var val = [];
  for (var key in objArray) {
    if (objArray.hasOwnProperty(key) && objArray[key]) {
      val.push(key);
    }
  }
}