var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Game = mongoose.model('Game')
var Team = mongoose.model('Team')
var Player = mongoose.model('Player')
var isLoggedIn = require('../../config/auth')

module.exports = function (app) {
  app.use('/reset', router)
}

router.route('/')
  .get(isLoggedIn, function (req, res, next) {
    res.render('reset', {
      title: 'Warning'
    })
  })
  .post(isLoggedIn, function (req, res, next) {
    Game.remove({}, function (err) {
      if (err) throw err
      Team.remove({}, function (err) {
        if (err) throw err
        Player.remove({}, function (err) {
          if (err) throw err
          res.redirect('/game')
        })
      })
    })
  })
