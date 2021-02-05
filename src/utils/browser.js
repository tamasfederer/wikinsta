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
	},

	isWebshareApiEnabled() {
		if (navigator.share !== undefined) {
			return true
		}

		return false
	},

	shareByWebshareApi(data = null) {
		if (data !== null) {
			const shareData = {
				title: data['title'],
				text: data['text'],
				url: data['url'],
			};

			// Share
			return navigator.share(shareData);
		}
	},

	shareByClipboard(data = null) {
		if (data !== null) {
			// Create a DOM element
			const el = document.createElement('textarea');
			// Set value to URL
			el.value = data['url'];
			// Append DOM element
			document.body.appendChild(el);
			// Select content
			el.select();
			// Copy content
			document.execCommand('copy');
			// Remove DOM element
			document.body.removeChild(el);
		}
	},
}

export default browser