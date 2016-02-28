var dest = 'www';
var src = 'src';
var maps = 'maps';

module.exports = {
	production: false,
	html: {
		src: './src/index.html',
		dest: dest
	},
	style: {
		src: './src/styles/**/*.scss',
		inputFolder: './src/styles',
		dest: dest + '/css'
	},
	script: {
		entry: './src/scripts/app.js',
		watch: './src/scripts/**',
		dest: dest + '/js',
		outputName: 'bundle.js'
	},
	assets: {
		src: './src/assets/**/*',
		dest: dest + '/assets'
	},
	shaders: {
		src: './src/shaders/**/*',
		dest: dest + '/shaders'
	},
	browserSync: {
		dest: dest
	},
	vendor: {
		src: [
			'./src/vendor/three.min.js',
			'./src/vendor/TrackballControls.js',
			'./src/vendor/TweenMax.min.js',
			'./src/vendor/Wagner.js',
			'./src/vendor/Wagner.base.js',
			'./src/vendor/dat.gui.js'
		],
		dest: dest + '/js/vendor',
		outputName: 'vendor.js'
	}
};