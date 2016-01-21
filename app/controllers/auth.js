var express = require('express')
var passport = require('passport')
var mongoose = require('mongoose')
var Account = mongoose.model('User')
var router = express.Router()

module.exports = function (app) {
  app.use('/auth', router)
}

router.route('/register')
  .get(function (req, res, next) {
    res.render('auth/register', { })
  })
  .post(function (req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
      if (err) {
        console.log(err)
        return res.render('auth/register', {info: 'Sorry. That username already exists. Try again.'})
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/')
      })
    })
  })

router.route('/login')
  .get(function (req, res, next) {
    res.render('auth/login', { user: req.user })
  })
  .post(passport.authenticate('local'), function (req, res) {
    res.redirect('/')
  })

router.route('/logout')
  .get(function (req, res, next) {
    req.logout()
    res.redirect('/')
  })

router.route('/ping')
  .get(isLoggedIn, function (req, res, next) {
    res.status(200).send('pong!')
  })

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next()
  }

  // if they aren't redirect them to the home page
  res.redirect('/')
}
