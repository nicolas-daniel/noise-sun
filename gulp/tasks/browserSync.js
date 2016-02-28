var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	config = require('../config').browserSync

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: config.dest,
		},
		open: false,
		notify: false,
		port: process.env.PORT || 3003
	});
});