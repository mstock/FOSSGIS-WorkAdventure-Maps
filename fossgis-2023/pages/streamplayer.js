"use strict";

function Streamplayer(videoElementId, debug) {
	this.video = document.getElementById(videoElementId);
	if (!this.video) {
		throw new Error('No video element id passed or video not found');
	}
	this.streamUrl = this.video.dataset.streamUrl;
	this.debug = debug;
	if (Hls.isSupported()) {
		this.hls = new Hls({
			debug: this.debug,
			manifestLoadingMaxRetry: 10
		});
		this.hls.on(Hls.Events.ERROR, (event, data) => {
			if (data.fatal) {
				switch (data.type) {
					case Hls.ErrorTypes.NETWORK_ERROR:
						console.log('Fatal network error encountered, try to recover. Error: ', data);
						if (data.fatal) {
							this.listeners.fatalError.forEach(listener => listener(this.hls));
						}
						else {
							this.hls.startLoad();
						}
						break;
					case Hls.ErrorTypes.MEDIA_ERROR:
						console.log('Fatal media error encountered, try to recover');
						this.hls.recoverMediaError();
						break;
					default:
						console.log('Fatal, unrecoverable error encountered, freeing resources');
						this.hls.destroy();
						this.listeners.fatalError.forEach(listener => listener(this.hls));
						break;
				}
			}
		});
	}
	this.listeners = {
		fatalError: []
	};
}

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
