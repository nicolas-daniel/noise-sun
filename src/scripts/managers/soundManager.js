const createPlayer = require('web-audio-player');
const createAnalyser = require('web-audio-analyser');
const average = require('analyser-frequency-average');

class SoundManager {

	constructor () {

		console.log('SoundManager :: construct');

		this.bass = 0;
		this.midBass = 0;
		this.voice = 0;
		this.drum = 0;
		this.pause = false;
		this.assets = './assets/';
		this.source = 'mome.mp3';

		this.initSound();
		this.initGui();

	}

	initGui () {

		this.soundGui = window.gui.addFolder('Sound');
		
		let source = this.soundGui.add(this, 'source', [ 'mome.mp3','the-presets-ghosts.mp3','bluejean_short.mp3' ] );
		source.onChange((src) => {
			this.initSound();
		});
		
		let pause = this.soundGui.add(this, 'pause');
		pause.onChange(() => {
			if (this.pause) this.player.pause();
			else this.player.play();
		});

	}

	initSound () {

		// reset player
		if (this.player) {
			this.player.stop()
			this.player = null;
		}

		this.player = createPlayer( this.assets + this.source, { loop:true });
		this.audioUtil = createAnalyser( this.player.node, this.player.context, { stereo: false });
		this.analyser = this.audioUtil.analyser;

		this.player.on('load', () => {

			console.log('SoundManager :: Source:', this.player.element ? 'MediaElement' : 'Buffer')
			console.log('SoundManager :: Playing', Math.round(this.player.duration) + 's of audio...')

			this.player.play()

		}.bind(this));

	}

	update () {

		this.freqs = this.audioUtil.frequencies();

		this.bass = average(this.analyser, this.freqs, 40, 200);
		this.midBass = average(this.analyser, this.freqs, 200, 600);
		this.voice = average(this.analyser, this.freqs, 600, 2000 );
		this.drum = average(this.analyser, this.freqs, 2000, 16000 );

	}

}

export default SoundManager;