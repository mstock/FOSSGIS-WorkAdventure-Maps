(function() {
	"use strict";

	const stageObjectName = 'stage';
	const instructions = 'http://localhost:8000/fossgis-2022/pages/instructions.html'
	const slideshowUrl = 'http://localhost:8000/fossgis-2022/pages/slideshow.html';
	const partyUrl = 'http://localhost:8000/fossgis-2022/pages/party.html';
	const playlist = [
		// End time                              URL
		[ new Date('2022-03-05T16:00:00+01:00'), slideshowUrl ],
		[ new Date('2022-03-05T17:00:00+01:00'), partyUrl ],
		[ new Date('2022-03-09T20:00:00+01:00'), slideshowUrl ],
		[ new Date('2022-03-09T23:00:00+01:00'), partyUrl ],
		[ null,                                  slideshowUrl ],
	];

	function selectVideo() {
		const now = new Date();
		const video = playlist.find((entry) => !entry[0] || entry[0] >= now);
		if (!video) {
			throw new Error(`No matching video found for current time (${now})`);
		}
		return video[1];
	}

	async function switchStageUrl(newUrl) {
		const website = await WA.room.website.get(stageObjectName);
		website.url = newUrl;
	}

	switchStageUrl(instructions);

	WA.room.onEnterLayer('ShowVideo').subscribe(() => {
		switchStageUrl(selectVideo());
	});

	WA.room.onLeaveLayer('ShowVideo').subscribe(() => {
		switchStageUrl(instructions);
	});
})();
