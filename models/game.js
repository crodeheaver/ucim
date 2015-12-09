// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teamSchema = require('./team').schema;

// create a schema
var gameSchema = new Schema({
  gameName: String,
  winner: teamSchema,
  winnerPoints: Number,
  loser: teamSchema,
  loserPoints: Number,
  date:Date,
  section: String
});

// the schema is useless so far
// we need to create a model using it
var Game = mongoose.model('Game', gameSchema);

// make this available to our users in our Node applications
module.exports = Game;