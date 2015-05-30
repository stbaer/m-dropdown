'use strict';
var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('lint', function() {
	return gulp.src(['./**/*.js', '!node_modules/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('<%= jshint.js.src %>', ['lint']);
  gulp.watch(['<%= jshint.js.src %>', '<%= jshint.test.src %>'], ['lint', 'test']);
});

gulp.task('default', ['lint', 'watch']);
