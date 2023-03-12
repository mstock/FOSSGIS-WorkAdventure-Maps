"use strict";

(function () {
	function Stage() {
		this.slideshow = new Slideshow();
		this.streamplayer = new Streamplayer('stream');
		this.streamplayer.onFatalError(() => {
			this.switchToSlideshow();
		});
		this.element = document.body;
		this.defaultPollingInterval = 1000;
		this.pollingInterval = this.defaultPollingInterval;
		this.backoffFactor = 2;
		this.maxPollingInterval = 64 * 1000;
	}

	Stage.prototype.pollStream = function() {
		fetch(this.streamplayer.streamUrl)
			.then(response => {
				if (response.ok) {
					this.switchToStream();
				}
				else {
					this.switchToSlideshow();
				}
			})
			.catch(error => {
				console.error('Error fetching stream playlist:', error);
				this.switchToSlideshow();
			});
	};

	Stage.prototype.scheduleStreamPolling = function() {
		console.log('Scheduling next stream polling in ', this.pollingInterval, 'ms');
		setTimeout(() => {
			this.pollStream()
		}, this.pollingInterval);
		this.pollingInterval = this.pollingInterval < this.maxPollingInterval
			? this.pollingInterval * this.backoffFactor
			: this.maxPollingInterval;
	};

	Stage.prototype.switchToSlideshow = function() {
		if (this.element.classList.contains('stream-mode')) {
			this.element.classList.replace('stream-mode', 'slideshow-mode');
			this.slideshow.start();
		}
		else if (!this.element.classList.contains('slideshow-mode')) {
			this.element.classList.add('slideshow-mode');
			this.slideshow.start();
		}
		this.scheduleStreamPolling();
	};

	Stage.prototype.switchToStream = function() {
		if (this.element.classList.contains('slideshow-mode')) {
			this.element.classList.replace('slideshow-mode', 'stream-mode');
			this.slideshow.stop();
		}
		else {
			this.element.classList.add('stream-mode');
		}
		this.streamplayer.play();
		this.pollingInterval = this.defaultPollingInterval;
	};

	const stage = new Stage();
	stage.pollStream();
})();
