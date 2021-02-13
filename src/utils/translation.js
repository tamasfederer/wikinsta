const TRANSLATION_TABLE = {
	'en': {
		'isThumbnailNeeded_true': "Only articles with images will be loaded!",
		'isThumbnailNeeded_false': "All articles will be loaded!",
		'isDark_true': "Dark theme enabled!",
		'isDark_false': "Light theme enabled!",
		'language': "Language set to English!",
		'error': "An error occurred!",
	},
	'hu': {
		'isThumbnailNeeded_true': "Csak olyan cikkek lesznek betöltve, melyekhez van kép!",
		'isThumbnailNeeded_false': "Minden cikk be lesz tölte!",
		'isDark_true': "Sötét téma engedélyezve!",
		'isDark_false': "Világos téma engedélyezve!",
		'language': "Nyelv magyarra állítva!",
		'error': "Hiba!",
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

	getNextLanguage(language = null) {
		if (language === null) {
			return null;
		}

		// Create language array
		let language_list = [];

		for (var key in TRANSLATION_TABLE) {
			language_list.push(key);
		}

		// Get new position
		let position = language_list.indexOf(language) + 1;

		if (position === language_list.length) {
			position = 0;
		}

		return language_list[position];
	},

	getTranslation({ language = null, item = null }) {
		if (language === null) {
			return ":-(";
		}

		if (!(language in TRANSLATION_TABLE)) {
			return ":-(";
		}

		if (item === null) {
			return TRANSLATION_TABLE[language]['error'];
		}

		if (!(item in TRANSLATION_TABLE[language])) {
			return TRANSLATION_TABLE[language]['error'];
		}

		return TRANSLATION_TABLE[language][item];
	}
};

export default translation;