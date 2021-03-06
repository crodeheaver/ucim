var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Player = mongoose.model('Player')
var multer = require('multer')
var xlsx = require('node-xlsx')
var isLoggedIn = require('../../config/auth')

module.exports = function (app) {
  app.use('/player', router)
}

router.route('/')
  .get(isLoggedIn, function (req, res, next) {
    var promise = Player.find().sort('lastName').exec()

    promise.then(function (players) {
      res.render('player/index', {
        title: 'Players',
        players: players,
        user: req.user
      })
    })
      .catch(function (err) {
        next(err)
      })
  })
  .post(isLoggedIn, function (req, res, next) {
    Player.remove({
      _id: req.body._id
    })
      .then(function (players) {
        res.redirect('/player')
      })
      .catch(function (err) {
        next(err)
      })
  })

router.route('/addPlayer')
  .get(isLoggedIn, function (req, res, next) {
    res.render('player/add_player', {
      title: 'New Player',
      user: req.user
    })
  })
  .post(isLoggedIn, function (req, res, next) {
    new Player({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex
    }).save()
      .then(function (updated) {
        res.redirect('/player')
      })
      .catch(function (err) {
        next(err)
      })
  })

router.get('/uploadxlsx', isLoggedIn, function (req, res, next) {
  res.render('player/add_by_file', {
    title: 'Players',
    user: req.user
  })
})
router.post('/uploadxlsx', isLoggedIn, multer({dest: './public/uploads/'}).single('upl'), function (req, res, next) {
  var list = xlsx.parse(req.file.destination + req.file.filename)[0].data

  for (var i = 0; i < list.length; i++) {
    console.log(list[i][0])
    new Player({
      firstName: list[i][1],
      lastName: list[i][0],
      sex: list[i][2]
    }).save()
      .catch(function (err) {
        next(err)
      })
  }
  res.redirect('/player')
})
