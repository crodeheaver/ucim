var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  Name: String,
  wins: Number,
  losses: Number,
  section: String,
  members:[{type: mongoose.Schema.ObjectId, ref: 'Player'}]
});


mongoose.model('Team', teamSchema);
