var fs =require('fs');
var lineReader = require('line-reader');
var S = require('string');

var isheader = true;
lineReader.eachLine("../db/marketbasket.csv", function(line) {
  var arr = line.split(','); 
  var items = [];
  if (isheader) {
    for(var i in arr) {
	  items.push(S(arr[i]).trim().s);
    }

    isheader = false;
	fs.writeFile("items.json", JSON.stringify(items));
    return false;
  } else {
    for(var i in arr) {
      if (arr[i] == '1')
		  items.push(i);
    }
    if (items.length > 0)
	  console.log(items.join(','));
  }
}).then(function () {
});
