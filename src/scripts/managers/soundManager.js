const soundcloud = require('soundcloud-badge');
const createPlayer = require('web-audio-player');
const createAnalyser = require('web-audio-analyser');
const average = require('analyser-frequency-average');

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = AudioContext ? new AudioContext() : null;

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
		
		let pause = this.soundGui.add(this, 'pause');
		pause.onChange(() => {
			if (this.pause) this.player.pause();
			else this.player.play();
		});

	}

	initSound () {

		soundcloud({
			client_id: 'b95f61a90da961736c03f659c03cb0cc',
			song: 'https://soundcloud.com/flume/insane-feat-moon-holiday',
			dark: false,
			getFonts: true
		}, (err, src, data, div) => {
			if (err) throw err;
			this.player = new Audio();
			this.player.crossOrigin = 'Anonymous';
			this.player.addEventListener('canplay', () => {
				this.audioUtil = createAnalyser(this.player, audioContext, { audible: true, stereo: false })
				this.analyser = this.audioUtil.analyser;
				this.player.play();
			});
			this.player.src = src;
		});

	}

	update () {

		if (this.audioUtil) {
			this.freqs = this.audioUtil.frequencies();

			this.bass = average(this.analyser, this.freqs, 40, 200);
			this.midBass = average(this.analyser, this.freqs, 200, 600);
			this.voice = average(this.analyser, this.freqs, 600, 2000 );
			this.drum = average(this.analyser, this.freqs, 2000, 16000 );
		}

	}

}

export default SoundManager;