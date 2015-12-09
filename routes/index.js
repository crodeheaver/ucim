exports.setup = function(app, express, mongoose) {
    var router = express.Router()
    var playerSchema = require("../models/player")
    var teamSchema = require("../models/team")
    var gameSchema = require("../models/game")
    var Players = mongoose.model('Player', playerSchema);
    var Teams = mongoose.model('Team', playerSchema);
    var Game = mongoose.model('Game', gameSchema);

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.redirect(302, "teams");
    });
    /* GET home page. */
    router.get('/getcontacts', function(req, res, next) {
        res.render('get_players', {
            title: 'Express'
        });
    });
    /* GET home page. */
    router.get('/players', function(req, res, next) {

        Players.find().exec(function(err, players) {
            if (err) return next(err);
            res.render('player/player', {
                title: 'Players',
                players: players
            });
        });
    });

    /* Post player page. */
    router.post('/players', function(req, res, next) {

        Players.remove({
            _id: req.body._id
        }, function(err) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                if (err.code == 11000)
                    res.write('{error: this person alread exists}');
                else
                    res.write('{error: "' + err + '"}');
                res.end();
            };

            Players.find().exec(function(err, players) {
                if (err) return next(err);

                res.redirect("/players");
            });
        });
    });

    /* GET home page. */
    router.get('/addplayer', function(req, res, next) {
        res.render('player/add_player', {
            title: 'New Player'
        });
    });

    /* Post player page. */
    router.post('/addplayer', function(req, res, next) {

        var newPlayer = new Players({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sex: req.body.sex
        });
        newPlayer.save(function(err, data) {
            if (err) {

                res.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                if (err.code == 11000)
                    res.write('{error: this person alread exists}');
                else
                    res.write('{error: "' + err + '"}');
                res.end();
            };
            res.redirect("/players");
        })
    });


    /* GET home page. */
    router.get('/teams', function(req, res, next) {
        Teams.find({
            section: "Coed"
        }).sort({
            teamName: '1'
        }).exec(function(err, coed) {
            Teams.find({
                section: "Guys"
            }).sort({
                teamName: '1'
            }).exec(function(err, guys) {
                Teams.find({
                    section: "Girls"
                }).sort({
                    teamName: '1'
                }).exec(function(err, girls) {
                    if (err) return next(err);
                    res.render('teams/teams', {
                        title: 'Teams',
                        coed: coed,
                        guys: guys,
                        girls: girls
                    });
                });
            });
        });
    });

    /* GET home page. */
    router.get('/addteam', function(req, res, next) {
        res.render('teams/add_team', {
            title: 'New Team'
        });
    });

    /* Post player page. */
    router.post('/addteam', function(req, res, next) {

        var newTeam = new Teams({
            teamName: req.body.teamName,
            wins: 0,
            losses: 0,
            members: [],
            section: req.body.section
        });

        newTeam.save(function(err, data) {
            if (err) throw err;

            res.redirect("/teams");
        })
    });

    /* Post player page. */
    router.get('/editteam', function(req, res, next) {

        Teams.findOne({
            _id: req.query._id
        }).exec(function(err, team) {
            if (err) return next(err);

            Players.find({
                '_id': {
                    $nin: team.members
                }
            }).exec(function(err, players) {
                if (err) return next(err);

                res.render('teams/edit_team', {
                    title: 'Edit Team',
                    team: team,
                    players: players
                });
            });
        });
    });

    /* Post player page. */
    router.get('/addtoteam', function(req, res, next) {
        Teams.findOne({
            _id: req.query.teamId
        }).exec(function(err, team) {
            if (err) return next(err);

            Players.find({
                '_id': {
                    $nin: team.members
                }
            }).exec(function(err, players) {
                if (err) return next(err);

                res.render('teams/add_team_members', {
                    title: 'Edit Team',
                    team: team,
                    players: players
                });
            });
        });
    });


    /* Post player page. */
    router.post('/addtoteam', function(req, res, next) {
        Players.find({
            '_id': {
                $in: req.body['players[]']
            }
        }, function(err, players) {
            if (err) throw err;
            Teams.findOne({
                _id: req.body.teamId
            }).exec(function(err, team) {
                if (err) throw err;

                players.map(function(player) {
                    team.members.push(player);
                });

                team.save(function(err) {
                    if (err) throw err;
                    res.writeHead(302, {
                        'Location': '/editteam?_id=' + req.body.teamId,
                        _id: req.body.teamId
                            //add other headers here...
                    });
                    res.end();
                });
            });
        });
    });

    /* Post player page. */
    router.post('/updateteam', function(req, res, next) {

        Teams.findOne({
            _id: req.body.teamId
        }).exec(function(err, team) {
            if (err) return next(err);

            var delmembers = req.body['members[]'];
            if (delmembers != null) {
                if (delmembers.constructor === Array) {
                    delmembers.map(function(memberId) {
                        team.members.id(memberId).remove();
                    })
                }
                else
                    team.members.id(delmembers).remove();

            }

            team.save(function(err) {
                if (err) throw err;
                res.render('teams/edit_team', {
                    title: 'Edit Team',
                    team: team,
                    players: team.members
                });
            });
        });
    });




    /* GET home page. */
    router.get('/games', function(req, res, next) {

        Game.find({
            section: "Coed"
        }).exec(function(err, coed) {
            if (err) return next(err);
            Game.find({
                section: "Guys"
            }).exec(function(err, guys) {
                if (err) return next(err);
                Game.find({
                    section: "Girls"
                }).exec(function(err, girls) {
                    if (err) return next(err);
                    res.render('games/games', {
                        title: 'Games',
                        coed: coed,
                        guys: guys,
                        girls: girls
                    });
                });
            });
        });
    });

    /* GET home page. */
    router.get('/addgame', function(req, res, next) {
        var date = new Date();
        Game.find().exec(function(err, gameList) {
            if (err) throw err;
            Teams.find({
                section: req.query.section
            }).exec(function(err, teamList) {
                if (err) return next(err);
                var numGames;
                if (gameList == undefined)
                    numGames = 1;
                else
                    numGames = gameList.length + 1;
                res.render('games/add_game', {
                    title: 'Add Game',
                    numGames: numGames,
                    teams: teamList,
                    section: req.query.section,
                    date: date
                });
            })
        });
    });

    /* GET home page. */
    router.post('/addgame', function(req, res, next) {

        Teams.findOne({
            _id: req.body.winner
        }).exec(function(err, winner) {
            if (err) return next(err);
            Teams.findOne({
                _id: req.body.loser
            }).exec(function(err, loser) {
                if (err) return next(err);
                Teams.findOne({
                    _id: winner._id
                }, function(err, doc) {
                    if (err) throw err;
                    doc.wins++;;
                    doc.save();
                });

                Teams.findOne({
                    _id: loser._id
                }, function(err, doc) {
                    if (err) throw err;
                    doc.losses++;;
                    doc.save();
                });

                var newGame = new Game({
                    gameName: req.body.gameName,
                    winner: winner,
                    winnerPoints: req.body.winnerPoints,
                    loser: loser,
                    loserPoints: req.body.loserPoints,
                    section: req.body.section,
                    date: new Date(req.body.date + " " + req.body.time)
                });
                newGame.save(function(err, data) {
                    if (err) {

                        res.writeHead(500, {
                            'Content-Type': 'application/json'
                        });
                        if (err.code == 11000)
                            res.write('{error: this team alread exists}');
                        else
                            res.write('{error: "' + err + '"}');
                        res.end();
                    };

                    res.redirect("/games");
                })
            })
        })
    });


    router.post('/deletegame', function(req, res, next) {

        Game.findOne({
            _id: req.body.gameId
        }, function(err, game) {
            if (err) throw err;
            console.log(game)
            Teams.findOne({
                _id: req.body.winnerId
            }, function(err, doc) {
                if (err) throw err;
                doc.wins--;
                doc.save();
            });

            Teams.findOne({
                _id: req.body.loserId
            }, function(err, doc) {
                if (err) throw err;
                doc.losses--;
                doc.save();
            });
            Game.remove({
                _id: req.body.gameId
            }, function(err) {
                if (err) throw err;
                res.redirect("/games");
            })
        })
    });



    /* GET home page. */
    router.get('/stats', function(req, res, next) {

        Teams.find({
            section: "Coed"
        }).sort({
            wins: '-1'
        }).exec(function(err, coed) {
            if (err) return next(err);
            Teams.find({
                section: "Guys"
            }).sort({
                wins: '-1'
            }).exec(function(err, guys) {
                if (err) return next(err);
                Teams.find({
                    section: "Girls"
                }).sort({
                    wins: '-1'
                }).exec(function(err, girls) {
                    if (err) return next(err);
                    res.render('stats/stats', {
                        title: 'Stats',
                        coed: coed,
                        guys: guys,
                        girls: girls
                    });
                })
            })
        })
    });

    router.get('/statdetails', function(req, res, next) {

        Teams.findOne({
            _id: req.query._id
        }).exec(function(err, team) {
            if (err) return next(err);

            Game.find({
                $or: [{
                    "winner._id": team._id
                }, {
                    "loser._id": team._id
                }]
            }).exec(function(err, games) {
                var totalPointsFor = 0;
                var totalPointsAgainst = 0;
                games.map(function(game) {
                    if (game.winner.teamName === team.teamName) {
                        totalPointsFor += game.winnerPoints;
                        totalPointsAgainst += game.loserPoints;
                    }
                    else {
                        totalPointsFor += game.loserPoints;
                        totalPointsAgainst += game.winnerPoints;
                    }

                })


                res.render('stats/details', {
                    title: 'Details',
                    team: team,
                    games: games,
                    totalPointsFor: totalPointsFor,
                    totalPointsAgainst: totalPointsAgainst
                });
            })
        })
    });

    /* GET home page. */
    router.get('/reset', function(req, res, next) {
        res.render('reset', {
                    title: 'Warning'
                });
    });
    
    router.post('/reset', function(req, res, next) {
        Game.remove({}, function(err) {
            Teams.remove({}, function(err) {
                Players.remove({}, function(err) {
                    res.redirect("/games");
                });
            });
        });
    });
    return router
}
