// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
  firstName: String,
  lastName: String
});

playerSchema.index({ firstName: 1, lastName: 1}, { unique: true, sparse: true});

// the schema is useless so far
// we need to create a model using it
var Player = mongoose.model('Player', playerSchema);

// make this available to our users in our Node applications
module.exports = Player;