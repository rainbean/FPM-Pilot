var fs =require('fs');
var a = [{id:2, text:'a'},{id:3, text:'b'}];
console.log(a);
//fs.writeFileSync("test.json", a);
fs.writeFileSync("test.json", JSON.stringify(a));
var b = fs.readFileSync("../db/items.json");
//console.log(b);
b = JSON.parse(b);
console.log(b[1]);
