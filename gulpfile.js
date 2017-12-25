'use strict';
/* jshint unused:false */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('app', function() {
    return nodemon({
            script: 'server.js',
            execMap: {
                js: './node_modules/browserify/bin/cmd.js -t brfs pub/js/app.js -d -o > pub/assets/js/bundle.js && node --harmony'
            },
            ignore: [
                'README.md',
                'node_modules/**',
                'pub/assets'
            ],
            watchedExtensions: ['js', 'json', 'html'],
            watchedFolders: ['./pub'],
            debug: true,
            delayTime: 1,
            env: {
                NODE_ENV: 'local',
                PORT: 3000,
            }
        });
});

// Restart the app server
gulp.task('app-restart', function() {
    nodemon.emit('restart');
});

/** Build it all up and serve it */
gulp.task('default', ['app']);
