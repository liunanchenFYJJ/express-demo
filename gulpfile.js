let gulp = require('gulp');
let sass = require('gulp-sass');

// sass --> css
gulp.task('sass', async() => {
    await gulp.src('./public/stylesheets/sass/*.sass') // sass路径
        .pipe(sass())
        .pipe(gulp.dest('./public/stylesheets/css')); // 输出路径
});

// 监听sass --> css
gulp.task('sass_watch', async() => {
    await gulp.watch('./public/stylesheets/sass/*.sass', gulp.series('sass'));
});