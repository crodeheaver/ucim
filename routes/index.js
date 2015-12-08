exports.setup = function(app, express, mongoose) {
    var router = express.Router()
    var playerSchema = require("../models/player")
    var teamSchema = require("../models/team")
    var gameSchema = require("../models/game")

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });
    /* GET home page. */
    router.get('/getcontacts', function(req, res, next) {
        res.render('get_players', {
            title: 'Express'
        });
    });
    /* GET home page. */
    router.get('/players', function(req, res, next) {
        var Players = mongoose.model('Player', playerSchema);
        var query = Players.find().exec(function(err, players) {
            if (err) return next(err);
            res.render('player/player', {
                title: 'Players',
                players: players
            });
        });
    });

    /* Post player page. */
    router.post('/players', function(req, res, next) {
        var Player = mongoose.model('Player', playerSchema);

        Player.remove({
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

            var query = Player.find().exec(function(err, players) {
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
        var Players = mongoose.model('Player', playerSchema);

        var newPlayer = new Players({
            firstName: req.body.firstName,
            lastName: req.body.lastName
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
        var Teams = mongoose.model('Team', playerSchema);
        var query = Teams.find().exec(function(err, teams) {
            if (err) return next(err);
            res.render('teams/teams', {
                title: 'Teams',
                teams: teams
            });
        });
    });

    /* GET home page. */
    router.get('/addteam', function(req, res, next) {
        res.render('teams/add_team', {
            title: 'New Player'
        });
    });

    /* Post player page. */
    router.post('/addteam', function(req, res, next) {
        var Team = mongoose.model('Team', teamSchema);

        var newTeam = new Team({
            teamName: req.body.teamName,
            wins: 0,
            losses: 0,
            members: []
        });

        console.log(newTeam);
        newTeam.save(function(err, data) {
            if (err) throw err;

            res.redirect("/teams");
        })
    });

    /* Post player page. */
    router.post('/editteam', function(req, res, next) {
        var Team = mongoose.model('Team', playerSchema);
        var Players = mongoose.model('Player', playerSchema);

        Team.findOne({
            _id: req.body._id
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
        var Team = mongoose.model('Team', playerSchema);
        var Players = mongoose.model('Player', playerSchema);
        Team.findOne({
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
        var Players = mongoose.model('Player', playerSchema);
        var Team = mongoose.model('Team', teamSchema);
        Players.find({
            '_id': {
                $in: req.body['players[]']
            }
        }, function(err, players) {
            Team.findOne({
                _id: req.body.teamId
            }).exec(function(err, team) {
                if (err) throw err;

                players.map(function(player) {
                    team.members.push(player);
                });

                team.save(function(err) {
                    if (err) throw err;
                    res.redirect("/teams");
                });
            });
        });
    });

    /* Post player page. */
    router.post('/updateteam', function(req, res, next) {
        var Team = mongoose.model('Team', playerSchema);
        var Players = mongoose.model('Player', playerSchema);

        Team.findOne({
            _id: req.body.teamId
        }).exec(function(err, team) {
            if (err) return next(err);

            var delmembers = req.body['members[]'];
            if (delmembers != null) {
                if (delmembers.constructor === Array) {
                    delmembers.map(function(memberId) {
                        console.log(memberId);
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
        var Games = mongoose.model('Game', gameSchema);
        Games.find().exec(function(err, gameList) {
            if (err) return next(err);
            console.log(gameList);
            res.render('games/games', {
                title: 'Games',
                games: gameList
            });
        });
    });

    /* GET home page. */
    router.get('/addgame', function(req, res, next) {
        var Team = mongoose.model('Team', playerSchema);
        var Games = mongoose.model('Game', playerSchema);
        Games.find().exec(function(err, gameList) {
            Team.find().exec(function(err, teamList) {
                if (err) return next(err);
                res.render('games/add_game', {
                    title: 'Add Game',
                    numGames: gameList.length,
                    teams: teamList
                });
            })
        });
    });

    /* GET home page. */
    router.post('/addgame', function(req, res, next) {
        var Game = mongoose.model('Game', gameSchema);
        var Team = mongoose.model('Team', teamSchema);

        console.log(req.body.winner)
        console.log(req.body.loser)
        Team.findOne({
            _id: req.body.winner
        }).exec(function(err, winner) {
            if (err) return next(err);
            Team.findOne({
                _id: req.body.loser
            }).exec(function(err, loser) {
                if (err) return next(err);

                var newGame = new Game({
                    gameName: req.body.gameName,
                    winner: winner,
                    loser: loser
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
    /* GET home page. */
    router.get('/stats', function(req, res, next) {
        var Game = mongoose.model('Game', gameSchema);
        var Team = mongoose.model('Team', teamSchema);
        
        Team.find().exec(function(err, teams) {
            if (err) return next(err);

            teams.map(function(team) {
                Game.count({
                    "winner._id": team._id
                }).exec(function(err, wins) {
                    Game.count({
                        "loser._id": team._id
                    }).exec(function(err, losses) {
                        console.log(team.teamName + " has " + wins + " wins and " + losses +" losses")
                    })
                    console.log("done");
                })
            })
        })
    });
    return router
}
