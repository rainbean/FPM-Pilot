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
//console.log(JSON.stringify(fp[0]));
//console.log(JSON.stringify(fp[1]));
});

