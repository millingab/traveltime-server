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

// /users
router.route('/')

  // POST 
  .post(function (req, res) {
    var user = new User();
    user.name = req.body.name;

    if (!(req.body.name))
      handleError(res, "Invalid user input", "Must provide a name for user", 400);
    else {
      user.save(function (err, event) {
        if (err)
          handleError(res, err.message, "Failed to create a new user");

        res.json({
          id: user._id,
          message: 'User created!'
        });
      });
    }
  })

// GET
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err)
        handleError(res, "Server Error", "Failed to fetch users");

      res.json(users);
    });
  });

module.exports = router;