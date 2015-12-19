var express = require('express'),
    router = express.Router(),
    util = require('util'),
    mongoose = require('mongoose'),
    Team = mongoose.model('Team'),
    Player = mongoose.model('Player');

module.exports = function(app) {
    app.use('/team', router);
};

router.route('/')
    .get(function(req, res, next) {
            Team.aggregate([{$sort: { Name: 1}},{ $group: { _id: "$section", teams: { $push: "$$ROOT" } } }] )
            .exec()
            .then(function(sections){
                res.render('team/index', {
                     title: 'Teams',
                     sections: sections
                 })
            })
            .catch(function(err) {
                next(err);
            });
    })
    
router.route("/addTeam")
    .get(function(req, res, next) {
        res.render('team/add_team', {
            title: 'New Team'
        })
    })
    .post(function(req, res, next) {
        return new Team({
            Name: req.body.teamName,
            wins: 0,
            losses: 0,
            members: [],
            section: req.body.section
        }).save()
        .then(function(updated){
            res.redirect('/team')
        })
        .catch(function(err) {
                next(err);
            });
    })
    
router.route("/editTeam")
    .get(function(req, res, next) {
        Team.findOne({
                _id: req.query._id
            }).populate('members').exec()
            .then(function(team) {
                res.render('team/edit_team', {
                    title: 'Edit Team',
                    team: team,
                    players: team.members
                })
            })
            .catch(function(err){
                next(err);
            })
    })
    .post(function(req, res, next) {
        Team.findOne({
                _id: req.body.teamId
            }).populate('members').exec()
            .then(function(team) {
                team.teamName = req.body.teamName;

                team.members.pull.apply(team.members,req.body.members)
                
                return team.save()
                    .then(function() {
                        res.redirect(util.format('%s?%s=%s','/team/editTeam','_id',req.query._id));
                    })
            })
            .catch(function(err) {
                next(err);
            })
    })

router.route('/addPlayer')
    .get(function(req, res, next) {
        Team.findOne({
                _id: req.query._id
            }).populate('members').exec()
            .then(function(team) {
                return Player.find({
                        _id: {
                            $nin: team.members
                        }
                    }).exec()
                    .then(function(players) {
                        res.render('team/add_player', {
                            title: 'Edit Team',
                            team: team,
                            players: players
                        })
                    })
            })
            .catch(function(err) {
                next(err);
            })
    })
    .post(function(req, res, next) {
        
        Team.findOne({
                _id: req.body.teamId
            }).exec()
            .then(function(team) {
                
                team.members.push.apply(team.members, req.body.players)

                return team.save()
            })
            
            .then(function() {
                res.redirect(util.format('%s?%s=%s','/team/editTeam','_id',req.body.teamId));
            })
            .catch(function(err) {
                next(err);
            })
    })