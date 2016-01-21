var path = require('path')
var rootPath = path.normalize(__dirname + '/..')
var env = process.env.NODE_ENV || 'development'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'UCIM'
    },
    port: 8080,
    db: 'mongodb://localhost/ucim-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'UCIM'
    },
    port: 3000,
    db: 'mongodb://localhost/ucim-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'UCIM'
    },
    port: 8080,
    db: 'mongodb://localhost/ucim-production'
  }
}

module.exports = config[env]
