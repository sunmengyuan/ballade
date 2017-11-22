var express = require('express');
var ejs = require('ejs');
var path = require('path');
var routes = require('./routes');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
app.use('/', routes);

module.exports = app;
