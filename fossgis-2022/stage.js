(function() {
	"use strict";

	const stageObjectName = 'stage';
	const instructions = 'http://localhost:8000/fossgis-2022/pages/instructions.html'
	const video = 'https://media.ccc.de/v/fossgis2021-9013-die-cloud-hat-open-source-gefressen/oembed'

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
