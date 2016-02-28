var gulp = require('gulp');
var config = require('../config').assets;

gulp.task('assets', function() {
	
	gulp.src(config.src)
	.pipe(gulp.dest(config.dest))

});