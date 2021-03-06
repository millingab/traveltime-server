// server.js

// BASE SETUP
// ==================================================

// calling the packages 
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');

// configuring the app to use bodyParser()
app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// setting up mongoDB 

var uristring = process.env.MONGODB_URI || 'mongodb://heroku_6v9hlx8r:hng9lun94e5u1b5hg5q0ln9mrn@ds023684.mlab.com:23684/heroku_6v9hlx8r';

var mongoose = require('mongoose');
mongoose.connect(uristring, function(err,res){
	if (err) {
		console.log('ERROR connecting to: '+ uristring + '. ' + err);	
	}
	else {
		console.log('Connected to mongoDB');
	}
});

// pulling Schemas
var Event = require('./app/models/event');

// ROUTES
// ==================================================

var router = require('./app/routes/index');		
var events_router = require('./app/routes/events');

// registering the routes
app.use('/api', router);
app.use ('/api/events', events_router);

// START THE SERVER
// ==================================================

app.listen(port);
console.log('Connected to port '+ port);

// catch 404 and forward it to the error handler
app.use(function(req,res,next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development'){
	app.use(function(err,req,res,next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
