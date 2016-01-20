var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Team = mongoose.model('Team');

module.exports = function(app) {
    app.use('/stat', router);
};

router.route('/')
    .get(function(req, res, next) {
        Team.find({ section: 'Coed'})
            .sort({ wins: '-1'})
            .exec()
            .then(function(coed) {
                    return Team.find({ section: 'Guys' })
                    .sort({ wins: '-1' })
                    .exec()
                    .then(function(guys) {
                        return [coed, guys]
                    })
            })
            .then(function(teams) {
                return Team.find({ section: 'Girls' })
                .sort({ wins: '-1' })
                .exec()
                .then(function(girls) {
                    return [teams[0], teams[1], girls]
                })
            })
            .then(function(teams) {
                res.render('stat/index', {
                    title: 'Stats',
                    coed: teams[0],
                    guys: teams[1],
                    girls: teams[2]
                })
            })
            .catch(function(err) {
                next(err)
            })
    })
    
router.route("/details")
.get(function (req, res, next) {
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
        games.map(function (game) {
          if (game.winner.teamName === team.teamName) {
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
          totalPointsAgainst: totalPointsAgainst
        })
      })
    })
  })