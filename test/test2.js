var fs =require('fs');
var lineReader = require('line-reader');
var S = require('string');

//lineReader.eachLine("../db/seqdumper.log", function(line) {
var line = 'Key: 0: Value: ([0],80), ([141, 0],42), ([132, 0],42)';
var subject = "/admin.php?page=settings&tabs_added[114787535263592]=1&tabs_added[217770811582323]=1&tabs_added[198738186831542]=1";

  if (line.indexOf('Key: ') != 0)
	return; // only handle valid lines start with 'key: '
  //var arr = line.split(/Key: (\d+): Value|[:,] \(([\s\d\[\],]+)\)/);
  //var arr = line.split(/Key: |: Value|[:,] \(|\)/);
  var arr = line.match(/Key: (\d+): Value:/g);
  for(var i in arr) {
	console.log(i + ' ==> ' + arr[i]);
  }
  
var regexp = /tabs_added\[(\d+)\]/g;
var pageIds = [], match;
while(match = regexp.exec(subject)) 
	pageIds.push(match[1]);
console.log(pageIds);
//});
