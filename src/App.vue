<template>
	<transition name="slide">
		<Notification v-if="notificationText">{{notificationText}}</Notification>
	</transition>
	<Header :isDark=isDark :language=language />
	<div class="container">
		<Introduction :language=language />
		<Article @share="share" v-for="(article, index) in articles" :key="index" :article="article" :isDark=isDark :language=language />
	</div>
	<Footer @changeTheme="changeTheme" @changeIsThumbnailNeeded="changeIsThumbnailNeeded" @changeLanguage="showLanguageSelect = !showLanguageSelect" @resetPage="resetPage" @share="share" :isDark=isDark :isThumbnailNeeded=isThumbnailNeeded />
	<LanguageSelect v-if="showLanguageSelect" @changeLanguage="changeLanguage" />
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Introduction from '@/components/Introduction.vue';
import LanguageSelect from '@/components/LanguageSelect.vue';

import Article from '@/components/Article.vue';
import Notification from '@/components/Notification.vue';

import Wiki from '@/utils/wiki';
import browser from '@/utils/browser';
import translation from '@/utils/translation';

const ARTICLE_TO_RENDER = 10;
const NOTIFICATION_TIMEOUT = 2000;

const DEFAULT_IS_THUMBNAIL_NEEDED = true;
const DEFAULT_IS_DARK = false;
const DEFAULT_LANGUAGE = "en";

export default {
	name: 'App',

	components: {
		Header,
		Footer,
		Introduction,
		Article,
		Notification,
		LanguageSelect,
	},

	data() {
		return {
			wiki: null,

			articles: [],
			articleRenderCount: 0,

			notificationText: null,
			notificationTimeout: null,

			isThumbnailNeeded: DEFAULT_IS_THUMBNAIL_NEEDED,
			isDark: DEFAULT_IS_DARK,
			language: DEFAULT_LANGUAGE,

			showLanguageSelect: false,
		}
	},

	watch: {
		articleRenderCount() {
			if (this.articleRenderCount === 0) {
				browser.bottomCheck({ callback: this.render });
			}
		},

		isThumbnailNeeded() {
			if (this.isThumbnailNeeded) {
				this.notify(this.getNotificationText("isThumbnailNeeded_true"));
			} else {
				this.notify(this.getNotificationText("isThumbnailNeeded_false"));
			}
		},

		isDark() {
			if (this.isDark) {
				document.documentElement.className = 'theme-dark';
				this.notify(this.getNotificationText("isDark_true"));
			} else {
				document.documentElement.className = 'theme-light';
				this.notify(this.getNotificationText("isDark_false"));
			}
		},

		language() {
			this.notify(this.getNotificationText("language"));
		},
	},

	mounted() {
		// Register Wiki
		this.wiki = new Wiki();

		// Get language
		let language = browser.getGetParam({
			key: 'language'
		});

		// Get id
		let id = browser.getGetParam({
			key: 'id'
		});

		// Redirect if needed
		if ((id !== null) && (language !== null)) {
			let href = this.wiki.getUrl({
				id: id,
				language: language,
			});

			browser.redirect(href);
		}

		// Get default language
		if (language === null) {
			language = translation.getUserLanguage()
		}

		// Get isThumbnailNeeded
		let isThumbnailNeeded = browser.getGetParam({
			key: 'isThumbnailNeeded'
		});

		// Get isDark
		let isDark = browser.getGetParam({
			key: 'isDark'
		});

		// Set parameters
		this.setLanguage(language);
		this.setIsThumbnailNeeded(isThumbnailNeeded);
		this.setIsDark(isDark);

		// Reset
		this.resetPage();
	},

	methods: {
		// Helpers

		evaluateBoolean(value) {
			if (typeof(value) === "boolean") {
				return value;
			}

			if (typeof(value) === "number") {
				if (value === 0) {
					return false;
				} else {
					return true;
				}
			}

			if (typeof(value) === "string") {
				if ((value.toUpperCase() === "TRUE") || (value.toUpperCase() === "1")) {
					return true;
				} else {
					return false;
				}
			}

			return null;
		},

		getNotificationText(item) {
			return translation.getTranslation({
				language: this.language,
				item: item,
			});
		},

		notify(notificationText = "Hey!") {
			if (this.notificationText) {
				clearTimeout(this.notificationTimeout);
			}

			this.notificationText = notificationText;

			this.notificationTimeout = setTimeout(() => {
				this.notificationText = null;
			}, NOTIFICATION_TIMEOUT);
		},

		// Parameter setters

		setIsThumbnailNeeded(isThumbnailNeeded) {
			isThumbnailNeeded = this.evaluateBoolean(isThumbnailNeeded);

			if (isThumbnailNeeded !== null) {
				if (isThumbnailNeeded != DEFAULT_IS_THUMBNAIL_NEEDED) {
					browser.setGetParam({
						key: "isThumbnailNeeded",
						value: isThumbnailNeeded,
					});
				} else {
					browser.deleteGetParam({
						key: "isThumbnailNeeded",
					});
				}

				this.isThumbnailNeeded = isThumbnailNeeded;
			}
		},

		setIsDark(isDark) {
			isDark = this.evaluateBoolean(isDark);

			if (isDark !== null) {
				if (isDark != DEFAULT_IS_DARK) {
					browser.setGetParam({
						key: "isDark",
						value: isDark,
					});
				} else {
					browser.deleteGetParam({
						key: "isDark",
					});
				}

				this.isDark = isDark;
			}
		},

		setLanguage(language) {
			language = translation.evaluateLanguage(language);

			if (language !== null) {
				if (language != DEFAULT_LANGUAGE) {
					browser.setGetParam({
						key: "language",
						value: language,
					});
				} else {
					browser.deleteGetParam({
						key: "language",
					});
				}

				this.language = language;
			}
		},

		// Event handlers

		changeIsThumbnailNeeded(isThumbnailNeeded) {
			this.setIsThumbnailNeeded(isThumbnailNeeded);

			this.resetPage();
		},

		changeTheme(isDark) {
			this.setIsDark(isDark);
		},

		changeLanguage(language) {
			if ((language != this.language) && (language != null)) {
				this.setLanguage(language);

				this.resetPage();
			}

			this.showLanguageSelect = false;
		},

		resetPage() {
			this.wiki.reinitParameters({
				language: this.language,
			});

			// Initialize Article pool and get first articles
			this.articles = [];

			this.wiki.getRandomArticles()
				.then(() => {
					this.render();
				})
		},

		share(data = null) {
			if (browser.isWebshareApiEnabled()) {
				browser.shareByWebshareApi(data).then(() => {
					this.notify(this.getNotificationText("shared"));
				})
			} else {
				browser.shareByClipboard(data);
				this.notify(this.getNotificationText("copied"));
			}
		},

		// Render function

		render() {
			if (this.articleRenderCount === 0) {
				// Disable callback
				browser.bottomCheck({ callback: null })

				this.articleRenderCount += ARTICLE_TO_RENDER;

				for (var i = 0; i < ARTICLE_TO_RENDER; i++) {
					this.wiki.getArticleNext({ isThumbnailNeeded: this.isThumbnailNeeded })
						.then(result => {
							if (result !== null) {
								if (result['language'] === this.language) {
									this.articles.push(result)
								}
							}

							this.articleRenderCount -= 1;
						})
				}
			}
		},
	}
}
</script>
<style lang="css" scoped>
.container {
	background-color: var(--color-bg);

	padding-top: 48px;
	width: 50%;
	margin: auto;

	text-align: justify;
}

@media only screen and (min-width: 480px) {
	.container {
		width: 480px;
	}
}

@media only screen and (max-width: 480px) {
	.container {
		width: 100%;
	}
}

@media only screen and (orientation: landscape) {
	.container {
		width: 100%;
		max-width: 960px;
	}
}

.slide-enter-active,
.slide-leave-active {
	transition: margin-top .25s;
}

.slide-enter-from,
.slide-leave-to {
	margin-top: -5rem;
}
</style>