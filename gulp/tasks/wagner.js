var gulp = require('gulp');
var config = require('../config').wagner;

gulp.task('wagner', function() {
	
	gulp.src(config.src)
	.pipe(gulp.dest(config.dest))

});