var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema({
  email: String,
  password: String
})

userSchema.plugin(passportLocalMongoose)

mongoose.model('User', userSchema)
