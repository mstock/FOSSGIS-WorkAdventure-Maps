(function() {
	"use strict";

	const stageObjectName = 'stage';
	const instructions = 'http://localhost:8000/fossgis-2022/pages/instructions.html'
	const video = 'http://localhost:8000/fossgis-2022/pages/party.html'

	async function switchStageUrl(newUrl) {
		const website = await WA.room.website.get(stageObjectName);
		website.url = newUrl;
	}

	switchStageUrl(instructions);

	WA.room.onEnterLayer('ShowVideo').subscribe(() => {
		switchStageUrl(video);
	});

	WA.room.onLeaveLayer('ShowVideo').subscribe(() => {
		switchStageUrl(instructions);
	});
})();
