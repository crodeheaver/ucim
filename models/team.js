// grab the things we need
var mongoose = require('mongoose');
var playerSchema = require("../models/player").schema
var Schema = mongoose.Schema;

// create a schema
var teamSchema = new Schema({
  teamName: String,
  wins: Number,
  losses: Number,
  members: [playerSchema],
  section: String
});


// the schema is useless so far
// we need to create a model using it
var Team = mongoose.model('Team', teamSchema);

// make this available to our users in our Node applications
module.exports = Team;