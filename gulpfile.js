var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')

gulp.task('develop', function () {
  livereload.listen()
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname)
      }
    })
    this.stdout.pipe(process.stdout)
    this.stderr.pipe(process.stderr)
  })
})

gulp.task('production', function () {})

gulp.task('default', [
  'develop'
])
