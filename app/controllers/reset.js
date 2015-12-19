var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Team = mongoose.model('Team'),
    Player = mongoose.model('Player');

module.exports = function(app) {
    app.use('/reset', router);
};

router.route('/')
    .get(function(req, res, next) {
        res.render('reset', {
            title: 'Warning'
        })
    })
    .post(function(req, res, next) {
        Game.remove({}, function(err) {
            if (err) throw err
            Team.remove({}, function(err) {
                if (err) throw err
                Player.remove({}, function(err) {
                    if (err) throw err
                    res.redirect('/game')
                })
            })
        })
    })