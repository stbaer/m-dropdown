'use strict';

var gulp        = require('gulp'),
    requireDir  = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./tasks', { recurse: true });

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['jshint']);
  gulp.watch('src/styles/**/*.js', ['styles']);
});

gulp.task('default', ['jshint', 'watch']);
