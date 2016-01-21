var mongoose = require('mongoose')
var Schema = mongoose.Schema

var playerSchema = new Schema({
  firstName: String,
  lastName: String,
  sex: String
})

playerSchema.index({ firstName: 1, lastName: 1 }, { unique: true, sparse: true})

mongoose.model('Player', playerSchema)
