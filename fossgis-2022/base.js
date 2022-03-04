(function() {
	"use strict";

	WA.onInit().then(() => {
		const mapUrl = WA.room.mapURL;
		const stageObjectName = 'stage';
		const stageLayerName = 'stage/ShowVideo';
		const instructionsUrl = new URL('pages/instructions.html', mapUrl).toString();
		const stageUrl = new URL('pages/stage.html', mapUrl).toString();

		async function switchStageUrl(newUrl) {
			const website = await WA.room.website.get(stageObjectName);
			console.log('Opening website: ', newUrl);
			website.url = newUrl;
		}

		switchStageUrl(instructionsUrl);

		WA.room.onEnterLayer(stageLayerName).subscribe(() => {
			switchStageUrl(stageUrl);
		});

		WA.room.onLeaveLayer(stageLayerName).subscribe(() => {
			switchStageUrl(instructionsUrl);
		});
	});
})();
