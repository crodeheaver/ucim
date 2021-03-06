var express = require('express')
var passport = require('passport')
var mongoose = require('mongoose')
var Account = mongoose.model('User')
var router = express.Router()
var Key = mongoose.model('Key')
module.exports = function (app) {
  app.use('/auth', router)
}

router.route('/register')
  .get(function (req, res, next) {
    res.render('auth/register')
  })
  .post(function (req, res) {
    Key.findOne({key_name: 'regcode'}).exec()
      .then(function (code) {
        console.log(code)
        if (code.key_code === req.body.regcode) {
          Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
              return res.render('auth/register', {info: 'Sorry. That username already exists. Try again.'})
            }
            passport.authenticate('local')(req, res, function () {
              res.redirect('/')
            })
          })
        } else {
          return res.render('auth/register', {info: 'Sorry. The registration code was incorrect. Try again.'})
        }
      })
      .catch(function (err) {
        return res.json({info: 'Sorry. That username already exists. Try again.', err: err})
      })
  })

router.route('/changePassword')
  .get(function (req, res, next) {
    res.render('auth/password_reset', { user: req.user })
  })
  .post(function (req, res, next) {
    Account.findOne({ username: req.user.username })
      .exec()
      .then(function (user) {
        user.setPassword(req.body.inputPassword, function (err, returnedUser, passwordErr) {
          if (err) {
            next(err)
          }
          user.save()
            .then(function (saved) {
              res.redirect('/auth/logout')
            })
            .catch(function (err) {
              next(err)
            })
        })
      })
  })

router.route('/login')
  .get(function (req, res, next) {
    res.render('auth/login', { user: req.user })
  })
  .post(passport.authenticate('local'), function (req, res) {
    res.redirect('/player')
  })

router.route('/logout')
  .get(function (req, res, next) {
    req.logout()
    res.redirect('/auth/login')
  })
