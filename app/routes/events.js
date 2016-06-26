var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = require('../models/event.js');

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

  event.save(function (err, event) {
    if (err)
      handleError(res, err.message, "Failed to create a new event");

    res.json({
      id: event._id,
      message: 'Event created!'
    });
  });
})

// GET
.get(function (req, res) {
  Event.find(function (err, events) {
    if (err)
      handleError(res, "Server Error", "Failed to fetch events", 500);

    res.json(events);
  });
});

router.route('/:event_id')

//GET
.get(function (req, res) {
  Event.findById(req.params.event_id, function (err, event) {
    if (err)
      handleError(res, "Bad Request", "Event does not exist", 400);

    res.json(event);
  });
})

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

module.exports = router;