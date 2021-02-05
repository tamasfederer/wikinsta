const BOTTOM_DISTANCE = 500;

var browser = {
	isMobile() {
		const toMatch = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i
		];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	},

	bottomCheck({ callback = null }) {
		if (callback) {
			window.onscroll = () => {
				let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight > (document.documentElement.offsetHeight - BOTTOM_DISTANCE)

				if (bottomOfWindow) {
					callback()
				}
			}
		} else {
			window.onscroll = () => {}
		}
	}
}

export default browser