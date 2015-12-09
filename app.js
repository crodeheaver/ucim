var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var hbs = require('hbs');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(hbs);

var routes = require('./routes/index');
var app = express();

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('dbhost', '127.0.0.1')
app.set('dbname', 'ucim')


app.set('port', process.env.PORT)
app.set('ip', process.env.IP)



mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'));

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('connection error', err);
});
db.once('open', function() {
    console.log('connected.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'))

app.use(routes.setup(app, express, mongoose))

var server = app.listen(app.get('port'), app.get('ip'), function () {
  console.log('UCIM is listening on https://' + app.get('ip') +":" + app.get('port'))
})