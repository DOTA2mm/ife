var gulp = require('gulp')
var browsersync = require('browser-sync').create()
var reload = browsersync.reload
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var cssminify = require('gulp-minify-css')

// less处理
gulp.task('style', function () {
  gulp.src('style/*.less')
    .pipe(less()) // 编译less
    .pipe(autoprefixer()) // 自动添加前缀
    .pipe(gulp.dest('dist/style')) // 生成css
    .pipe(reload({stream: true}))
})

// 自动刷新
gulp.task('server', function () {
  gulp.start('style')
  browsersync.init({
    port: 8086,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('style/*.less', ['style'])
  gulp.watch('index.html').on('change', reload)
})
gulp.task('default', ['server'])

// 生产环境 
gulp.task('build', function () {
  gulp.src('style/*.less')
    .pipe(less()) // 编译less
    .pipe(autoprefixer()) // 自动添加前缀
    .pipe(cssminify()) // 压缩css
    .pipe(gulp.dest('dist/style')) // 生成css
})