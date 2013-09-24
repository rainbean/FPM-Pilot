var fs =require('fs');
var lineReader = require('line-reader');

// attach the .contains method to Array's prototype to call it on any array
Array.prototype.contains = function (array, sizediff) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length <= array.length)
        return false;

	if (sizediff && this.length > array.length + sizediff)
		return false;

    for (var i = 0; i < array.length; i++) {
        if (this.indexOf(array[i]) == -1) {
            return false;
        }
    }
    return true;
}

// attach the .listsub method to Array's prototype to call it on any array
Array.prototype.listsub = function (array, sizediff) {
    // if the other array is a falsy value, return
    if (!array)
        return null;

	var match = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i].contains(array, sizediff)) {
            match.push(this[i]);
        }
    }
    return match;
}

// attach the .joinsub method to Array's prototype to call it on any array
Array.prototype.joinsub = function (array, sizediff) {
  // if the other array is a falsy value, return
  if (!array)
    return null;

  var match = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i].contains(array, sizediff)) {
      for (var j = 0; j < this[i].length; j++) {
        if (array.indexOf(this[i][j]) == -1) {
            match.push(this[i][j]);
        }
      }
    }
  }
  return match;
}

var items = JSON.parse(fs.readFileSync("../db/items.json"));
var fp = JSON.parse(fs.readFileSync("../db/fp.json"));

console.log(fp[0].map(toItemString));
//console.log(JSON.stringify(fp[0].joinsub([0, 141], 1)));
console.log(fp[0].joinsub([0, 141], 1).map(toItemString));

function toItemString(x) {
	if (x instanceof Array)
		return x.map(toItemString);
	return items[x].text;
}


