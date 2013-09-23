var fs =require('fs');
var lineReader = require('line-reader');
var S = require('string');

var fp = [];
lineReader.eachLine("../db/seqdumper.log", function(line) {
//var line = 'Key: 0: Value: ([0],80), ([141, 2, 0],42), ([132, 0],42)';

var match, key, value = [];
var regex = /^Key: (\d+): Value:/g;
match = regex.exec(line);
if (!match) 
  return;

key = match[1];

/**
 Regular Express <- /\[((\d+[, ]*)*)\],(\d+)/g
 Input  <- 'Key: 0: Value: ([0],80), ([141, 2, 0],42), ([132, 0],42)'
 Result <- [0]				[1]			[2]		[3]   
           '[0],80'			'0'			'0'		'80'
           '[141, 2, 0],42'	'141, 2, 0'	'0'		'42'
           '[132, 0],42'	'132, 0'	'0'		'42'
 **/
regex = /\[((\d+[, ]*)*)\],(\d+)/g; 
while(match = regex.exec(line)) {
  //console.log(match);
  //console.log(match[1].split(', ').sort()); // alhpabet or numberic sort?
  //console.log(match[1].split(', ').sort().join(','));
  //value.push({p: match[1].split(', ').sort(), sc: parseInt(match[3])});
  value.push(match[1].split(', ').map(function (x) { 
    return parseInt(x, 10); 
  }).sort());
}

fp[key] = value;
}).then(function () {
  fs.writeFile("fp.json", JSON.stringify(fp));
  console.log(JSON.stringify(fp[44].listsub([44,132],1)));
  console.log(JSON.stringify(fp[44].joinsub([44,132],1)));
  console.log(JSON.stringify(fp[44].listsub([44,110,132,141,175])));
});

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
