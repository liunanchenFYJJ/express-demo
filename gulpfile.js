const { task, src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
// 浏览器同步工具
const browserSync = require('browser-sync').create(); // 创建实例 监听前台资源
const nodemon = require('gulp-nodemon'); // 监听实时改变

// 启动服务
task('serve', (cb) => {
    nodemon({
        script: 'meadowlark.js',
        env: {
            'NODE_ENV': 'prod'
        }
    });
    cb();
});

// 监听前台资源
task('watch', (cb) => {
    browserSync.init({
        // server: {
        //     baseDir:"./home.hbs"
        // }
        // proxy: '/'
        files: ['**/**.hbs',
                '**/**.sass','**/**.css',
                '**/images/**.*'],
        // ignore: ['./gulpfile.js']
    });
    // watch('./public/stylesheets/sass/*.sass', series('sass'));
    // watch('**/**.hbs').on('change', browserSync.reload);
    cb();
}); 

// sass --> css
task('sass', (cb) => {
    src('./public/stylesheets/sass/*.sass') // sass路径
    .pipe(sass())
    .pipe(dest('./public/stylesheets/css')) // 输出路径
    .pipe(browserSync.stream());
    cb();
});

task('sass_watch', (cb) => {
    watch('./public/stylesheets/sass/*.sass', series('sass'));
    cb();
});

task('default', parallel('watch', 'serve'));