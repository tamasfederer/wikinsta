import axios from 'axios'
import browser from '@/utils/browser'

const WIKI_URL = "wikipedia.org";
const ARTICLE_CACHE_COUNT = 500;
const ARTICLE_CACHE_LIMIT = 50;
const LANGUAGE = "en";

const CATEGORY_LIST = {
	'en': 'Category',
	'hu': 'Kategoria',
	'ceb': 'Kategoriya',
	'sv': 'Kategori',
	'de': 'Kategorie',
	'fr': 'Categorie',
	'nl': 'Categorie',
	// 'ru': 'Категория',
	'it': 'Categoria',
	'es': 'Categoría',
	'pl': 'Kategoria',
	'war': 'Kaarangay',
	// 'vi': 'Thể_loại',
	'ja': 'Category',
	// 'arz': 'تصنيف',
	'zh': 'Category',
	// 'ar': 'تصنيف',
	// 'uk': 'Категорія',
	'pt': 'Categoria',
};

export default class Wiki {
	constructor({ articleCacheCount = ARTICLE_CACHE_COUNT, articleCacheLimit = ARTICLE_CACHE_LIMIT, language = LANGUAGE } = {}) {
		// Set default variables
		this.articles = [];
		this.articleCacheCount = articleCacheCount;
		this.articleCacheLimit = articleCacheLimit;
		this.language = language;

		// Cache shall be bigger than limit
		if (this.articleCacheCount <= this.articleCacheLimit) {
			this.articleCacheCount = this.articleCacheLimit + 1;
		}
	}

	getRandomArticles({ articleCount = null } = {}) {
		// Check if articleCount set
		if ((articleCount === null) || (articleCount < this.articleCacheCount)) {
			articleCount = this.articleCacheCount
		}

		// Save language
		let language = this.language;

		// Construct request
		let request = "https://" +
			language + "." +
			WIKI_URL +
			"/w/api.php" +
			"?origin=*" +
			"&action=query" +
			"&format=json" +
			"&list=random" +
			"&rnnamespace=0" +
			"&rnlimit=" + articleCount;

		// Return the promise
		return axios.get(request)
			.then(result => {
				// Get data
				let data = result.data['query']['random'];

				// Save the ID's
				for (var i = 0; i < data.length; i++) {
					this.articles.push({
						'id': data[i]['id'],
						'language': language,
					});
				}
			})
			.catch(error => console.log(error))
	}

	getArticleById({ articleId = null, language = null } = {}) {
		// Check if article is NULL
		if (articleId === null) {
			return null;
		}

		if (language === null) {
			language = this.language;
		}

		// Create request
		let request = "https://" +
			language + "." +
			WIKI_URL +
			"/w/api.php" +
			"?origin=*" +
			"&action=query" +
			"&format=json" +
			"&prop=extracts|pageimages|categories" +
			"&explaintext" +
			"&exintro" +
			"&exchars=250" +
			"&pithumbsize=500" +
			"&pageids=" + articleId;

		// Create promise
		return new Promise((resolve) => {
			axios.get(request)
				.then(result => {
					// Get data
					let data = result.data['query']['pages'][articleId];

					// Save language
					data['language'] = language;

					// Resolve
					resolve(this.convertDataToArticle({ data: data }))
				})
				.catch(error => console.log(error))
		})
	}

	getArticleNext({ isThumbnailNeeded = false } = {}) {
		// If there's no more article --> Return with 0
		if (this.articles.length === 0) {
			return new Promise((resolve) => {
				return resolve(null)
			})
		}

		// Get next ID
		let article = this.articles.shift();

		// Check ID's
		if (this.articles.length == this.articleCacheLimit) {
			this.getRandomArticles()
		}

		// Create promise
		return new Promise((resolve) => {
			this.getArticleById({ articleId: article['id'], language: article['language'] })
				.then(data => {
					if ((isThumbnailNeeded == true) && (data['thumbnail'] === null)) {
						return resolve(this.getArticleNext({
							isThumbnailNeeded: isThumbnailNeeded,
						}));
					} else {
						return resolve(data)
					}
				})
		})
	}

	convertDataToArticle({ data = null } = {}) {
		// Check result
		if (data === null) {
			return null;
		}

		// Save article
		let article = {};

		article['pageid'] = data['pageid'];
		article['title'] = data['title'];
		article['extract'] = data['extract'];

		// Get if mobile
		let medium = browser.isMobile() ? ".m" : "";

		// Save link
		article['link'] = "https://" +
			data['language'] +
			medium + "." +
			WIKI_URL +
			"/?curid=" +
			data['pageid'];

		// If there's no thumbnail then it's NULL
		if ('thumbnail' in data) {
			article['thumbnail'] = data['thumbnail']['source'];
		} else {
			article['thumbnail'] = null;
		}

		article['categories'] = [];

		// Get category length
		let categoryLength = 0;

		for (var k in CATEGORY_LIST) {
			if (k === data['language']) {
				categoryLength = CATEGORY_LIST[k].length + 1;
			}
		}

		if ('categories' in data) {
			for (var i = 0; i < data['categories'].length; i++) {
				// Get link
				let link = "https://" +
					data['language'] +
					medium + "." +
					WIKI_URL +
					"/wiki/" +
					data['categories'][i]['title'];

				// Get category link
				let title = data['categories'][i]['title'].substr(categoryLength);

				// Get hashtag
				let hashtag = "#" + title.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))).replace(/\s/g, '')

				// Save article
				article['categories'].push({
					'title': title,
					'hashtag': hashtag,
					'link': link,
				});
			}
		}

		return article;
	}

	reinitParameters({ articleCacheCount = ARTICLE_CACHE_COUNT, articleCacheLimit = ARTICLE_CACHE_LIMIT, language = LANGUAGE } = {}) {
		this.constructor({
			articleCacheCount: articleCacheCount,
			articleCacheLimit: articleCacheLimit,
			language: language,
		});
	}

	getUrl({ id = null, language = null } = {}) {
		if ((id === null) || (language === null)) {
			return;
		}

		// Get if mobile
		let medium = browser.isMobile() ? ".m" : "";

		return ("https://" +
			language +
			medium + "." +
			WIKI_URL +
			"/?curid=" +
			id);
	}
}