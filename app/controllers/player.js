var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Player = mongoose.model('Player'),
    multer  = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    xlsx = require('node-xlsx');

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

router.get('/uploadxlsx',function (req, res, next){
    res.render('player/add_by_file', {
                    title: 'Players'
                });
})
router.post('/uploadxlsx',multer({ dest: './public/uploads/'}).single('upl'),function(req, res, next){
    var list = xlsx.parse(req.file.destination + req.file.filename)[0].data
    
    for(var i = 0; i < list.length; i++)
    {
        console.log(list[i][0])
        new Player({
                firstName: list[i][1],
                lastName: list[i][0],
                sex: list[i][2]
            }).save()
            .catch(function(err) {
                next(err);
            });
    }
    res.redirect('/player')
})