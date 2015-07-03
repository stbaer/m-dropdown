'use strict';
var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('jshint', function() {
	return gulp.src(['./**/*.js', '!node_modules/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('<%= jshint.js.src %>', ['jshint']);
  gulp.watch(['<%= jshint.js.src %>', '<%= jshint.test.src %>'], ['jshint', 'test']);
});

gulp.task('default', ['jshint', 'watch']);
