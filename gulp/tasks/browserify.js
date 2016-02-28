var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	gulpif = require('gulp-if'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	babel = require('babelify'),
	glsl = require('glslify'),
	production = require('../config').production,
	config = require('../config').script;

gulp.task('browserify', function() {
	return browserify(config.entry, { debug: true }).on('error', gutil.log)
		.transform(babel)
		.transform(glsl)
		.on('error', console.error.bind(console))
		.bundle()
		.pipe(source(config.outputName)).on('error', gutil.log)
		.pipe(buffer())
		.pipe(gulpif(production, uglify()))
		.pipe(gulp.dest(config.dest)).on('error', gutil.log)
});