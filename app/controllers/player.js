var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Player = mongoose.model('Player');

module.exports = function(app) {
    app.use('/player', router);
};

router.route('/')
    .get(function(req, res, next) {
        var promise = Player.find().exec();

        promise.then(function(players) {
                res.render('player/index', {
                    title: 'Players',
                    players: players
                });
            })
            .catch(function(err) {
                next(err);
            });
    })
    .post(function(req, res, next) {
        Player.remove({
            _id: req.body._id
        })
        .then(function(players) {
                res.redirect('/player');
            })
            .catch(function(err) {
                next(err);
            });
    });


router.route('/addPlayer')
    .get(function(req, res, next) {
        res.render('player/add_player', {
            title: 'New Player'
        });
    })
    .post(function(req, res, next) {

        new Player({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex
            }).save()
            .then(function(updated) {
                res.redirect('/player')
            })
            .catch(function(err) {
                next(err);
            });
    });