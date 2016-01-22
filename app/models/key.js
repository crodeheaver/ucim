var mongoose = require('mongoose')
var Schema = mongoose.Schema

var keySchema = new Schema({
  key_name: String,
  key_code: String
})

mongoose.model('Key', keySchema)
