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

var uristring = process.env.MONGODB_URI;

var mongoose = require('mongoose');
console.log(uristring);
//mongoose.connect(uristring);

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

// START THE SERVER
// ==================================================

app.listen(port);
console.log('Connected to port '+ port);