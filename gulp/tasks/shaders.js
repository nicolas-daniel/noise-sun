var gulp = require('gulp');
var config = require('../config').shaders;

gulp.task('shaders', function() {
	
	gulp.src(config.src)
	.pipe(gulp.dest(config.dest))

});