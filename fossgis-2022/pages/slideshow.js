"use strict";

function Slideshow() {
	this.activeClass = 'slide-active';
	this.displayDuration = 5000;
	this.images = document.querySelectorAll('.slide');
	this.index = this.randomIndex();
	this.images[this.index].classList.add(this.activeClass);
}

Slideshow.prototype.start = function() {
	if (this.interval) {
		throw new Error('Slideshow already running, cannot start again');
	}

	if (this.images.length > 1) {
		this.interval = setInterval(() => {
			let nextIndex = this.index;
			while (nextIndex === this.index) {
				nextIndex = this.randomIndex();
			}
			this.images[this.index].classList.remove(this.activeClass);
			this.images[nextIndex].classList.add(this.activeClass);
			this.index = nextIndex;
		}, this.displayDuration);
	}
}

Slideshow.prototype.stop = function() {
	if (this.interval) {
		clearInterval(this.interval);
		this.interval = null;
	}
}

Slideshow.prototype.randomIndex = function() {
	return Math.floor(Math.random() * this.images.length);
}
