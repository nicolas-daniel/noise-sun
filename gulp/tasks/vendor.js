var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	production = require('../config').production,
	config = require('../config').vendor;

gulp.task('vendor', function () {
	return gulp.src(config.src)
		.pipe(concat(config.outputName))
		.pipe(gulpif(production, uglify()))
		.pipe(gulp.dest(config.dest))
});