const TRANSLATION_TABLE = {
	'en': {

	},
	'hu': {

	},
};

var translation = {
	evaluateLanguage(language = null) {
		if (language !== null) {
			if (language in TRANSLATION_TABLE) {
				return language;
			} else {
				return null;
			}
		}

		return null;
	},

	getUserLanguage() {
		return this.evaluateLanguage(
			navigator.language.substr(
				0, navigator.language.indexOf('-')
				)
			);
	},
};

export default translation;