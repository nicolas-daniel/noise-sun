var gulp = require('gulp');

gulp.task('dev', ['browser-sync','html','vendor','browserify','style','shaders','wagner','assets'], function() {

	gulp.start('watch');

});