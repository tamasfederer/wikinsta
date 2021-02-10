<template>
	<transition name="fade">
		<Notification v-if="notificationText">{{notificationText}}</Notification>
	</transition>
	<Header @share="share" :isDark=isDark :language=language />
	<div class="container">
		<Introduction />
		<Article @share="share" v-for="(article, index) in articles" :key="index" :article="article" :isDark=isDark :language=language />
	</div>
	<Footer @image="image" @reset="reset" @theme="theme" @language="changeLanguage" />
	<!-- <LanguageSelect /> -->
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Introduction from '@/components/Introduction.vue';
// import LanguageSelect from '@/components/LanguageSelect.vue';

import Article from '@/components/Article.vue';
import Notification from '@/components/Notification.vue';

import Wiki from '@/utils/wiki';
import browser from '@/utils/browser';

const ARTICLE_TO_RENDER = 10;
const NOTIFICATION_TIMEOUT = 2000;
const LANGUAGE_LIST = [
	'en',
	'hu',
	'ceb',
	'sv',
	'de',
	'fr',
	'nl',
//	'ru',
	'it',
	'es',
	'pl',
	'war',
//	'vi',
	'ja',
//	'arz',
	'zh',
//	'ar',
//	'uk',
	'pt',
];

export default {
	name: 'App',

	components: {
		Header,
		Footer,
		Introduction,
		Article,
		Notification,
		// LanguageSelect,
	},

	data() {
		return {
			wiki: null,
			articles: [],

			notificationText: null,

			isThumbnailNeeded: false,
			isDark: false,

			language: "en",

			articleRenderCount: 0,

			timeout: null,
		}
	},

	watch: {
		articleRenderCount() {
			if (this.articleRenderCount === 0) {
				// Register Bottom check
				browser.bottomCheck({ callback: this.render });
			}
		}
	},

	mounted() {
		// Register Wiki
		this.wiki = new Wiki();

		// Reset
		this.reset();
	},

	methods: {
		image(isThumbnailNeeded) {
			this.isThumbnailNeeded = isThumbnailNeeded;

			if (this.isThumbnailNeeded) {
				this.notify("Only articles with images will be loaded!");
			} else {
				this.notify("All articles will be loaded!");
			}
		},

		theme(isDark) {
			this.isDark = isDark;

			if (isDark) {
				document.documentElement.className = 'theme-dark';
				this.notify("Dark theme enabled!");
			} else {
				document.documentElement.className = 'theme-light';
				this.notify("Light theme enabled!");
			}
		},

		reset() {
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

		changeLanguage() {
			// Get position
			let oldPosition = LANGUAGE_LIST.indexOf(this.language);

			// Calculate new position
			let newPosition = oldPosition + 1

			if (newPosition === LANGUAGE_LIST.length) {
				newPosition = 0;
			}
			
			this.language = LANGUAGE_LIST[newPosition];

			this.reset();

			this.notify("Language set to " + this.language.toUpperCase() + "!");
		},

		share(data = null) {
			if (browser.isWebshareApiEnabled()) {
				browser.shareByWebshareApi(data).then(() => {
					this.notify(data['title'] + " shared!");
				})
			} else {
				browser.shareByClipboard(data);
				this.notify(data['title'] + " URL copied to the clipboard!");
			}
		},

		notify(text = "Hey!") {
			if (this.notificationText) {
				clearTimeout(this.timeout);
			}

			this.notificationText = text;

			this.timeout = setTimeout(() => {
				this.notificationText = null;
			}, NOTIFICATION_TIMEOUT);
		},

		render() {
			if (this.articleRenderCount === 0) {
				// Disable callback
				browser.bottomCheck({ callback: null })

				this.articleRenderCount += ARTICLE_TO_RENDER;

				for (var i = 0; i < ARTICLE_TO_RENDER; i++) {
					this.wiki.getArticleNext({ isThumbnailNeeded: this.isThumbnailNeeded })
						.then(result => {
							if (result !== null) {
								this.articles.push(result)
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

.fade-enter-active,
.fade-leave-active {
	transition: margin-top .25s;
}

.fade-enter-from,
.fade-leave-to {
	margin-top: -5rem;
}
</style>