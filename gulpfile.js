var gulp = require('gulp');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');

// browser-sync - live reload functionality
gulp.task('browser-sync', function () {

    browserSync({
        server: {
            baseDir: './src/main/webapp/'
        },
        port: 3008,
        open: false,
        ghostMode: false,
        codeSync: true,
        notify: true,
        socket: {
            domain: 'localhost:3008'
        }
    });
});

gulp.task('proxy', function() {
    console.log("Testing Default");

    return gulp.src('')
        .pipe(shell([
            'node proxy.js'
        ], {
            cwd: '.'
        }));

});

gulp.task('default',['browser-sync'], function () {
    browserSync.reload();
});