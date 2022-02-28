(function () {
	"use strict";

	const video = document.getElementById('stream');
	const videoSrc = video.dataset.streamUrl;
	if (Hls.isSupported()) {
		const hls = new Hls({
			debug: false
		});
		hls.loadSource(videoSrc);
		hls.attachMedia(video);
		hls.on(Hls.Events.ERROR, function (event, data) {
			if (data.fatal) {
				switch (data.type) {
					case Hls.ErrorTypes.NETWORK_ERROR:
						console.log('Fatal network error encountered, try to recover');
						hls.startLoad();
						break;
					case Hls.ErrorTypes.MEDIA_ERROR:
						console.log('Fatal media error encountered, try to recover');
						hls.recoverMediaError();
						break;
					default:
						console.log('Fatal, unrecoverable error encountered, freeing resources');
						hls.destroy();
						break;
				}
			}
		});
	}
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = videoSrc;
	}
})();
