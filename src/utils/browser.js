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
		if (navigator.share) {
			return true
		} else {
			return false
		}
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

	getLanguage() {
		if (window.navigator.languages) {
			return (window.navigator.languages[0]);
		} else {
			return (window.navigator.userLanguage || window.navigator.language);
		}
	},

	getGetParam({ key = null }) {
		const url = new URL(window.location);

		let retval = {};

		if (key === null) {
			url.searchParams.forEach((v, k) => {
				retval[k] = url.searchParams.get(k);
			});

			return retval;
		} else {
			return url.searchParams.get(key);
		}	
	},

	setGetParam({ key = null, value = null }) {
		if ((key === null) || (value === null)) {
			return;
		}

		const url = new URL(window.location);

		url.searchParams.set(key, value);

		window.history.pushState({}, '', url);
	},

	deleteGetParam({ key = null }) {
		const url = new URL(window.location);

		if (key === null) {
			url.searchParams.forEach((v, k) => {
				url.searchParams.delete(k);
			});
		} else {
			url.searchParams.delete(key);
		}

		window.history.pushState({}, '', url);
	},

	redirect(href = null) {
		if (href === null) {
			return;
		} else {
			window.location.href = href;
		}
	}
};

export default browser