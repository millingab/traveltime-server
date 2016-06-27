// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: String,
  picture: String,
  location: {
    lat: Number,
    lon: Number
  },
  events: [{type: Schema.ObjectId, ref:'Event'}]
});

module.exports = mongoose.model('User', UserSchema);