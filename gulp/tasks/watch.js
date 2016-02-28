var gulp = require('gulp'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	config = require('../config');

gulp.task('watch', function() {

	console.log('watch files');

	livereload.listen();

	watch([config.script.watch], function() {
		gulp.start('browserify');
	});

	watch(config.style.src, function() {
		gulp.start('style');
	});

	watch(config.html.src, function() {
		gulp.start('html');
	});

	watch(config.assets.src, function() {
		gulp.start('assets');
	});

	watch(config.shaders.src, function() {
		gulp.start('shaders');
	});

	watch(config.wagner.src, function() {
		gulp.start('wagner');
	});

});