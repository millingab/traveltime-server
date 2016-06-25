var express = require('express');
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

module.exports = router;