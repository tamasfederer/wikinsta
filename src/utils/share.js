var share = {
	// Share the data with Webshare API or copies the URL to the clipboard
	shareDataByItems({ title = "Title", text = "Text", url = "#" }) {

		// Check if there's Webshare API
		if (navigator.share !== undefined) {
			// Construct data
			const shareData = {
				title: title,
				text: text,
				url: url,
			};

			// Share
			navigator.share(shareData).then(() => {
				return true;
			})
		} else {
			// Create a DOM element
			const el = document.createElement('textarea');
			// Set value to URL
			el.value = url;
			// Append DOM element
			document.body.appendChild(el);
			// Select content
			el.select();
			// Copy content
			document.execCommand('copy');
			// Remove DOM element
			document.body.removeChild(el);

			return true;
		}
	}
}

export default share