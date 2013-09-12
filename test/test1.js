var fs =require('fs');
var lineReader = require('line-reader');
var S = require('string');

/***
 Rules   <- A | B 
 Sample  <- 1::Toy Story (1995)::Animation|Children's|Comedy
  A <- /::/  match "::"
  B <- /\s\((\d+)\)/  match " (1995)"
 ***/
lineReader.eachLine("../db/marketbasket.csv", function(line) {
  var arr = line.split(','); 
  var items = [];
  for(var i in arr) {
    if (arr[i] == '1')
		items.push(i);
  }
  if (items.length > 0)
	console.log(items.join(','));
});
