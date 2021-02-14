import en from './translation/translation-en.json';
import hu from './translation/translation-hu.json';
import de from './translation/translation-de.json';
import fr from './translation/translation-fr.json';
import sv from './translation/translation-sv.json';
import it from './translation/translation-it.json';
import nl from './translation/translation-nl.json';
import es from './translation/translation-es.json';


// 	'ceb': 'Kategoriya',
// 	// 'ru': 'Категория',
// 	'pl': 'Kategoria',
// 	'war': 'Kaarangay',
// 	// 'vi': 'Thể_loại',
// 	'ja': 'Category',
// 	// 'arz': 'تصنيف',
// 	'zh': 'Category',
// 	// 'ar': 'تصنيف',
// 	// 'uk': 'Категорія',
// 	'pt': 'Categoria',

const LANGUAGE_LIST = [
	'en',
	'hu',
	'de',
	'fr',
	'sv',
	'it',
	'nl',
	'es'
];

var translation = {
	evaluateLanguage(language = null) {
		if (language !== null) {
			if (LANGUAGE_LIST.indexOf(language) !== -1) {
				return language;
			} else {
				return null;
			}
		}

		return null;
	},

	getUserLanguage() {
		let language = navigator.language;

		if (language.indexOf('-') !== -1) {
			language = language.substr(0, language.indexOf('-'));
		}

		return this.evaluateLanguage(language);
	},

	getNextLanguage(language = null) {
		if (language === null) {
			return null;
		}

		// Get new position
		let position = LANGUAGE_LIST.indexOf(language) + 1;

		if (position === LANGUAGE_LIST.length) {
			position = 0;
		}

		return LANGUAGE_LIST[position];
	},

	getTranslation({ language = null, item = null }) {
		let translation_table = {
			'en': en,
			'hu': hu,
			'de': de,
			'fr': fr,
			'sv': sv,
			'it': it,
			'nl': nl,
			'es': es,
		}

		if (language === null) {
			return ":-(";
		}

		if (!(language in translation_table)) {
			return ":-(";
		}

		if (item === null) {
			return translation_table[language]['error'];
		}

		if (!(item in translation_table[language])) {
			if (item in translation_table['en']) {
				return translation_table['en'][item];
			} else {
				return translation_table[language]['error'];
			}
		}

		return translation_table[language][item];
	}
};

export default translation;