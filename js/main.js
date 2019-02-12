window.onload = function () {
	const videoInput = document.querySelector('.video-file');
	const renderOutput = document.querySelector('.video-render-container');
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	let video;

	videoInput.addEventListener('change', exportFrame, false);

	function exportFrame() {
		video = document.createElement('video');
		let img = new Image();

		function initCanvas() {
			canvas.width = this.videoWidth;
			canvas.height = this.videoHeight;
		}

		function drawFrame(e) {
			video.pause();
			ctx.drawImage(this, 0, 0);

			canvas.toBlob((blob) => {
				img.onload = URL.revokeObjectURL(this.src);
				img.src = URL.createObjectURL(blob);
				renderOutput.appendChild(img);
			}, 'image/jpeg');

			URL.revokeObjectURL(this.src);
		}

		video.addEventListener('loadedmetadata', initCanvas, false);
		video.addEventListener('timeupdate', drawFrame, false);

		video.muted = true;
		video.setAttribute('crossOrigin', 'anonymous');
		video.src = URL.createObjectURL(this.files[0]);
		video.play();
	}
}
