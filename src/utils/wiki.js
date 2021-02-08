import axios from 'axios'

const WIKI_API_URL = ".wikipedia.org/w/api.php";
const ARTICLE_CACHE_COUNT = 500;
const ARTICLE_CACHE_LIMIT = 50;
const LANGUAGE = "en";

export default class Wiki {
	constructor({ articleCacheCount = ARTICLE_CACHE_COUNT, articleCacheLimit = ARTICLE_CACHE_LIMIT, language = LANGUAGE } = {}) {
		// Set default variables
		this.articleIds = [];
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

		// Construct request
		let request = "https://" +
			this.language + 
			WIKI_API_URL +
			"?origin=*" +
			"&action=query" +
			"&format=json" +
			"&list=random" +
			"&rnnamespace=0" +
			"&rnlimit=" + articleCount;

		console.log(request)

		// Return the promise
		return axios.get(request)
			.then(result => {
				// Get data
				let data = result.data['query']['random'];

				// Save the ID's
				for (var i = 0; i < data.length; i++) {
					this.articleIds.push(data[i]['id']);
				}
			})
			.catch(error => console.log(error))
	}

	getArticleById({ articleId = null } = {}) {
		// Check if article is NULL
		if (articleId === null) {
			return null
		}

		// Create request
		let request = "https://" +
			this.language + 
			WIKI_API_URL +
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

					// Resolve
					resolve(this.convertDataToArticle({ data: data }))
				})
				.catch(error => console.log(error))
		})
	}

	getArticleNext({ isThumbnailNeeded = false } = {}) {
		// If there's no more article --> Return with 0
		if (this.articleIds.length === 0) {
			return new Promise((resolve) => {
				return resolve(null)
			})
		}

		// Get next ID
		let articleId = this.articleIds.shift();

		// Check ID's
		if (this.articleIds.length == this.articleCacheLimit) {
			this.getRandomArticles()
		}

		// Create promise
		return new Promise((resolve) => {
			this.getArticleById({ articleId: articleId })
				.then(result => {
					if ((isThumbnailNeeded == true) && (result['thumbnail'] === null)) {
						return resolve(this.getArticleNext({
							isThumbnailNeeded: isThumbnailNeeded,
						}));
					} else {
						return resolve(result)
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

		// If there's no thumbnail then it's NULL
		if ('thumbnail' in data) {
			article['thumbnail'] = data['thumbnail']['source'];
		} else {
			article['thumbnail'] = null;
		}

		article['categories'] = [];

		if ('categories' in data) {
			for (var i = 0; i < data['categories'].length; i++) {
				article['categories'].push(data['categories'][i]['title'])
			}
		}

		return article;
	}
}
