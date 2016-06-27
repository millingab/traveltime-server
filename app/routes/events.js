var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = require('../models/event.js');
var User = require('../models/user.js');


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

// /events
router.route('/')

  // POST 
  .post(function (req, res) {
    var event = new Event();
    event.name = req.body.name;

    if (!(req.body.name))
      handleError(res, "Invalid user input", "Must provide a event name", 400);
    else {
      event.save(function (err, event) {
        if (err)
          handleError(res, err.message, "Failed to create a new event");

        res.json({
          id: event._id,
          message: 'Event created!'
        });
      });
    }
  })

// GET
  .get(function (req, res) {
    Event.find(function (err, events) {
      if (err)
        handleError(res, "Server Error", "Failed to fetch events");

      res.json(events);
    });
  });

router.route('/:event_id')

  // GET
  .get(function (req, res) {
    Event.findById(req.params.event_id, function (err, event) {
      if (err)
        handleError(res, "Bad Request", "Event does not exist", 400);

      res.json(event);
    });
  })

  // PUT
  .put(function (req, res) {
    Event.findById(req.params.event_id, function (err, event) {
      if (err)
        res.send(err);

      event.name = req.body.name;

      event.save(function (err, event) {
        if (err)
          handleError(res, "Bad Request", "Event does not exist", 400);

        res.json({
          id: event._id,
          message: 'Event updated!'
        });
      });
    });
  })

  // DELETE
  .delete(function (req, res) {
    Event.remove({
      _id: req.params.event_id
    }, function (err, bear) {
      if (err)
        handleError(res, "Bad Request", "Event does not exist", 400);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

router.route('/:event_id/users')

  // POST 
  .post(function (req, res) {
    Event.findById(req.params.event_id, function(err,event){
      if (err)
        handleError(res, "Bad Request", "Event does not exist", 400);
      User.findById(mongoose.Types.ObjectId(req.body.id), function(err,user) {
        if (err)
          handleError(res, "Server Error", "User not found")
        
        user.events.push(req.params.event_id);
        event.users.push(mongoose.Types.ObjectId(req.body.id));
        
        console.log(event);
        console.log(user);
        user.save(function(err,user) {if (err) handleError(res, err.message, "Failed to update the user");});

        event.save(function (err, event) {
          if (err){
            handleError(res, err.message, "Failed to add the user");
          }
          res.json({
            message: 'User added!'
          });
        });
      });
    });
  })

  // GET
  .get(function(req,res) {
    Event.findById(req.params.event_id, function (err, event) {
      if (err)
        handleError(res, "Bad Request", "Event does not exist", 400);

      Event.find({'_id': { $in: event.users} }, function(err,users){
        if (err)
          handleError(res, "Server Error", "One or more user ids is/are not in database");
        res.json(users)    
      });
    });
  });

  // router.route('/:event_id/users/:user_id')

  // //DELETE
  // .delete(function(req,res){
  //   Event.findById(req.params.event_id, function (err, event) {
  //     if (err)
  //       handleError(res, "Bad Request", "Event does not exist", 400);
  //     event.users.
  //   });
  // });

module.exports = router;