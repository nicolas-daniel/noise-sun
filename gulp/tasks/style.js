var gulp = require('gulp'),
	compass = require('gulp-compass'),
	minifyCss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	production = require('../config').production,
	config = require('../config').style;

gulp.task('style', function() {

	gulp.src(config.src)
		.pipe(compass({
			sass: config.inputFolder,
			css: config.dest
		}))
		.on('error', function(error) {
			console.log(error);
		})
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulpif(production, minifyCss()))
		.pipe(gulp.dest(config.dest))
		.pipe(livereload());

});