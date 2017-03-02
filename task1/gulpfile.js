var gulp = require('gulp')
var browsersync = require('browser-sync').create()
var less = require('gulp-less')

// less处理
gulp.task('style', function () {
  gulp.src('style/*.{less, css}')
    .pipe(less()) // 编译less
    .pipe(gulp.dest('dist/style')) // 生成css
    .pipe(browsersync.stream())
})

// 自动刷新
gulp.task('server', function () {
  gulp.start('style')
  browsersync.init({
    port: 8086,
    server: {
      baseDir: ['dist', 'index.html']
    }
  })
  gulp.watch('style/*.{less, css}', ['style'])
  gulp.watch('*.html')
})
gulp.task('default', ['server'])