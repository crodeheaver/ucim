var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gameSchema = new Schema({
  winner: {type: mongoose.Schema.ObjectId, ref: 'Team'},
  winnerPoints: Number,
  loser: {type: mongoose.Schema.ObjectId, ref: 'Team'},
  loserPoints: Number,
  date: Date,
  section: String
})

mongoose.model('Game', gameSchema)
