
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var db = require('./routes/db');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.compress()); // gzip
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// check if movies database generated
/*
var moviedb = require('./routes/parser/movie2json.js');
moviedb.generate();

// check if user database generated
fs.exists("db/users.dat", function (exists) {
  if (!exists) {
    fs.writeFile("db/users.dat", "");
  }
});

// check if user-rating database generated
fs.exists("db/ratings.dat", function (exists) {
  if (!exists) {
    fs.writeFile("db/ratings.dat", "");
  }
});
*/

//app.get('/', routes.index); // go public/index.html directly
app.get('/users', user.list);
app.get('/rating/:name', user.getRate);
app.post('/rating/:name', user.setRate);
app.get('/db/:name', db.get);
app.post('/db/:name', db.post);
app.get('/movies', function(req, res) {
    res.sendfile('public/movies.json');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
