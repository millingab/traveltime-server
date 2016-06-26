// app/models/event.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  date: Date,
  all_day: Boolean,
  start_time: Number,
  end_time: Number,
  location: {
    lat: Number,
    lon: Number
  },
  note: String
});

module.exports = mongoose.model('Event', EventSchema);