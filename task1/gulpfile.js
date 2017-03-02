var gulp = require('gulp')
var browsersync = require('browser-sync').create()
var reload = browsersync.reload
var less = require('gulp-less')

// less处理
gulp.task('style', function () {
  gulp.src('style/*.less')
    .pipe(less()) // 编译less
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