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
    var winner = mongoose.Types.ObjectId(req.body.winnerId)
    var loser = mongoose.Types.ObjectId(req.body.loserId)
    Game.remove({
      _id: req.body.gameId
    })
      .exec()
      .then(function () {
        return Game.aggregate([
          { $match: { $or: [ {'winner': winner }, { 'loser': winner },
            {'winner': loser }, { 'loser': loser }]}},
          { $group: {_id: null,
              winLoseCount: { '$sum': { '$cond': [ { $eq: [ '$loser', winner ] }, 1, 0 ] } },
              winWinCount: { '$sum': { '$cond': [ { $eq: [ '$winner', winner ] }, 1, 0 ] } },
              loseLoseCount: { '$sum': { '$cond': [ { $eq: [ '$loser', loser ] }, 1, 0 ] } },
          loseWinCount: { '$sum': { '$cond': [ { $eq: [ '$winner', loser ] }, 1, 0 ] } }}}])
          .exec()
      })
      .then(function (results) {
        Team.update({_id: loser}, {wins: results[0].loseWinCount, losses: results[0].loseLoseCount}, {}).exec()
        Team.update({_id: winner}, {wins: results[0].winWinCount, losses: results[0].winLoseCount}, {}).exec()
        res.redirect('/game')
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
    var winner = mongoose.Types.ObjectId(req.body.winner)
    var loser = mongoose.Types.ObjectId(req.body.loser)

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
        return Game.aggregate([
          { $match: { $or: [ {'winner': winner }, { 'loser': winner },
            {'winner': loser }, { 'loser': loser }]}},
          { $group: {_id: null,
              winLoseCount: { '$sum': { '$cond': [ { $eq: [ '$loser', winner ] }, 1, 0 ] } },
              winWinCount: { '$sum': { '$cond': [ { $eq: [ '$winner', winner ] }, 1, 0 ] } },
              loseLoseCount: { '$sum': { '$cond': [ { $eq: [ '$loser', loser ] }, 1, 0 ] } },
          loseWinCount: { '$sum': { '$cond': [ { $eq: [ '$winner', loser ] }, 1, 0 ] } }}}])
          .exec()
      })
      .then(function (results) {
        Team.update({_id: loser}, {wins: results[0].loseWinCount, losses: results[0].loseLoseCount}, {}).exec()
        Team.update({_id: winner}, {wins: results[0].winWinCount, losses: results[0].winLoseCount}, {}).exec()
        res.redirect('/game')
      })
      .catch(function (err) {
        next(err)
      })
  })
