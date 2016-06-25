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

var router = express.Router();		

// middleware to use for all requests
router.use(function(req,res,next){
	console.log('Request received by the API');
	next();
});

// testing the route
router.get('/', function(req, res){
	res.json({message: 'Welcome to Travel Time'});
});

// registering the routes
app.use('/api', router);

// /events
router.route('/events')
	
	// POST 
	.post(function(req, res){
		var event = new Event();
		event.name = req.body.name;

		event.save(function(err) {
			if(err)
				res.send(err);

			res.json({message: 'Event created!'});
		});
	})

	// GET
	.get(function(req,res) {
		Event.find(function(err, events){
			if(err)
				res.send(err);

			res.json(events);
		});
	});

// START THE SERVER
// ==================================================

app.listen(port);
console.log('Connected to port '+ port);