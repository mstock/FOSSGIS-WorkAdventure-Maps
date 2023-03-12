"use strict";

function Streamplayer(videoElementId, debug) {
	this.video = document.getElementById(videoElementId);
	if (!this.video) {
		throw new Error('No video element id passed or video not found');
	}
	this.streamUrl = this.video.dataset.streamUrl;
	this.debug = debug;
	if (Hls.isSupported()) {
		this.initializeHls();
	}
	this.listeners = {
		fatalError: []
	};
}

Streamplayer.prototype.initializeHls = function() {
	this.hls = new Hls({
		debug: this.debug,
		manifestLoadingMaxRetry: 10
	});
	this.hls.on(Hls.Events.ERROR, (event, data) => {
		if (data.fatal) {
			switch (data.type) {
				case Hls.ErrorTypes.NETWORK_ERROR:
					console.log('Fatal network error encountered, resetting player. Error: ', data);
					break;
				case Hls.ErrorTypes.MEDIA_ERROR:
					console.log('Fatal media error encountered, resetting player. Error: ', data);
					break;
				default:
					console.log('Fatal, unrecoverable error encountered, resetting player. Error: ', data);
					break;
			}
			this.hls.destroy();
			this.listeners.fatalError.forEach(listener => listener());
			this.initializeHls();
		}
	});
};

Streamplayer.prototype.play = function() {
	if (this.hls) {
		this.hls.loadSource(this.streamUrl);
		this.hls.attachMedia(this.video);
	}
	else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
		this.video.src = this.streamUrl;
	}
};

Streamplayer.prototype.onFatalError = function(callback) {
	this.listeners.fatalError.push(callback);
};
