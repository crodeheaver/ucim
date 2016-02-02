var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Game = mongoose.model('Game')
var Team = mongoose.model('Team')
var isLoggedIn = require('../../config/auth')

module.exports = function (app) {
  app.use('/stat', router)
}

router.route('/')
  .get(isLoggedIn, function (req, res, next) {
    Team.aggregate([{$sort: { wins: -1}}, { $group: { _id: '$section', teams: { $push: '$$ROOT' } } }])
      .exec()
      .then(function (sections) {
        res.render('stat/index', {
          title: 'Stats',
          sections: sections,
          user: req.user
        })
      })
      .catch(function (err) {
        next(err)
      })
  })

router.route('/details')
  .get(isLoggedIn, function (req, res, next) {
    Team.findOne({
      _id: req.query._id
    }).exec(function (err, team) {
      if (err) return next(err)

      Game.find({
        $or: [{
          'winner': team._id
        }, {
          'loser': team._id
        }]
      }).populate('winner')
        .populate('loser').exec(function (err, games) {
        if (err) throw err
        var totalPointsFor = 0
        var totalPointsAgainst = 0
        console.log(games)
        games.map(function (game) {
          if (game.winner.Name === team.Name) {
            totalPointsFor += game.winnerPoints
            totalPointsAgainst += game.loserPoints
          } else {
            totalPointsFor += game.loserPoints
            totalPointsAgainst += game.winnerPoints
          }
        })
        res.render('stat/details', {
          title: 'Details',
          team: team,
          games: games,
          totalPointsFor: totalPointsFor,
          totalPointsAgainst: totalPointsAgainst,
          user: req.user
        })
      })
    })
  })
