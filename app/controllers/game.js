var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Game = mongoose.model('Game')
var Team = mongoose.model('Team')
var isLoggedIn = require('../../config/auth')

module.exports = function (app) {
  app.use('/game', router)
}

router.route('/')
  .get(isLoggedIn, function (req, res, next) {
    Game.aggregate([{
      $sort: {
        Name: 1
      }
    }, {
      $group: {
        _id: '$section',
        games: {
          $push: '$$ROOT'
        }
      }
    }])
      .exec()
      .then(function (sections) {
        return Team.populate(sections, {
          'path': 'games.loser games.winner'
        })
      })
      .then(function (sections) {
        res.render('game/index', {
          title: 'Games',
          sections: sections,
          user: req.user
        })
      })
      .catch(function (err) {
        next(err)
      })
  })
  .post(isLoggedIn, function (req, res, next) {
    Game.findOne({
      _id: req.body.gameId
    }).exec()
      .then(function (game) {
        Team.findOne({
          _id: req.body.winnerId
        })
          .then(function (doc) {
            doc.wins--
            doc.save()
          })

        Team.findOne({
          _id: req.body.loserId
        })
          .then(function (doc) {
            doc.losses--
            doc.save()
          })

        Game.remove({
          _id: req.body.gameId
        })
          .then(function () {
            res.redirect('/game')
          })
          .catch(function (err) { next(err) })
      })
      .catch(function (err) {
        next(err)
      })
  })

router.route('/addGame')
  .get(isLoggedIn, function (req, res, next) {
    var date = new Date()
    Game.find()
      .populate('winner')
      .populate('loser')
      .exec()
      .then(function (games) {
        return Team.find({
          section: req.query.section
        }).exec()
          .then(function (teams) {
            return [games, teams]
          })
      })
      .then(function (results) {
        var numGames
        if (results[0] === undefined) numGames = 1
        else numGames = results[0].length + 1
        res.render('game/add_game', {
          title: 'Add Game',
          numGames: numGames,
          teams: results[1],
          section: req.query.section,
          date: date,
          user: req.user
        })
      })
      .catch(function (err) {
        next(err)
      })
  })
  .post(isLoggedIn, function (req, res, next) {
    Team.find({
      _id: {
        $in: [req.body.winner, req.body.loser]
      }
    })
      .exec()
      .then(function (teams) {
        Team.findOne({ _id: req.body.winner }).exec()
          .then(function (team) {
            team.wins++
            return team.save()
          }).then(function () {
          return Team.findOne({ _id: req.body.loser }).exec()
        })
          .then(function (team) {
            team.losses++
            team.save()
          })
        new Game({
          gameName: req.body.gameName,
          winner: req.body.winner,
          winnerPoints: req.body.winnerPoints,
          loser: req.body.loser,
          loserPoints: req.body.loserPoints,
          section: req.body.section,
          date: new Date(req.body.date + ' ' + req.body.time)
        }).save()
          .then(function () {
            res.redirect('/game')
          })
          .catch(function (err) {
            next(err)
          })
      })
      .catch(function (err) {
        next(err)
      })
  })
