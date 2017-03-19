var gulp = require('gulp')

var browsersync = require('browser-sync').create()
var reload = browsersync.reload
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var cssminify = require('gulp-minify-css')

var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

// 处理js(es6)
gulp.task('javascript', function () {
  var b = browserify({
    entries: './js/main.js',
    debug: true
  })

  return b.transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest('./dist/js/'))
})

// 处理less
gulp.task('style', function () {
  gulp.src('./css/*.less')
    .pipe(less())
    .pipe(autoprefixer())    
    .pipe(cssminify())
    .pipe(gulp.dest('./dist/css/'))
})

// 自动刷新
gulp.task('server', ['javascript', 'style'], function () {
  browsersync.init({
    port: 8086,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./css/*.less', ['style']).on('change', reload)
  gulp.watch('./js/*.js', ['javascript']).on('change', reload)
  gulp.watch('./*.html').on('change', reload)
})

// 开发环境
gulp.task('dev', ['server'])
// 生成环境
gulp.task('build', ['javascript', 'style'])