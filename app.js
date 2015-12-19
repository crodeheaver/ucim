

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session);

mongoose.connect(config.db);



mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();


app.use(session({
  cookie: {maxAge:1000*60*2},
  secret: "3kx9cmdcm43123mvcwkd0493ck3985",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./config/express')(app, config);


app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

