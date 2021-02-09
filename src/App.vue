<template>
	<transition name="fade">
		<Notification v-if="notification">{{notification}}</Notification>
	</transition>
	<Header @share="share" :isDark=isDark />
	<div class="container">
		<Introduction />
		<Article @share="share" v-for="(article, index) in articles" :key="index" :article="article" :isDark=isDark :language=lang />
	</div>
	<Footer @image="image" @reset="reset" @theme="theme" @language="language" />
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

const ARTICLE_TO_RENDER = 1;
const NOTIFICATION_TIMEOUT = 2000;

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

			isThumbnailNeeded: false,

			notification: null,

			isDark: false,

			lang: "en",

			wikiRequestOngoing: 0,
			requestForReset: false,
		}
	},

	watch: {
		wikiRequestOngoing() {
			if (this.wikiRequestOngoing === 0) {
				// If request for reset --> reset
				if (this.requestForReset) {
					browser.bottomCheck({ callback: null })
					this.requestForReset = false;
					this.reset()
				} else {
					// Register Bottom check
					browser.bottomCheck({ callback: this.render })
				}
			}
		}
	},

	mounted() {
		// Initialize Article pool and get first articles
		this.reset()
	},

	methods: {
		image(isThumbnailNeeded) {
			this.isThumbnailNeeded = isThumbnailNeeded;
		},

		theme(isDark) {
			this.isDark = isDark;

			if (isDark) {
				document.documentElement.className = 'theme-dark';
			} else {
				document.documentElement.className = 'theme-light';
			}
		},

		reset() {
			if (this.wikiRequestOngoing > 0) {
				this.requestForReset = true;
			} else {
				// Register Wiki
				this.wiki = new Wiki({ language: this.lang });

				this.articles = [];

				// Initialize Article pool and get first articles
				this.wikiRequestOngoing += 1

				this.wiki.getRandomArticles()
					.then(() => {
						this.wikiRequestOngoing -= 1
						this.render();
					})
			}
		},

		language() {
			if (this.lang === "en") {
				this.lang = "hu"
			} else if (this.lang === "hu") {
				this.lang = "en"
			}

			this.reset();
		},

		share(data = null) {
			if (browser.isWebshareApiEnabled()) {
				browser.shareByWebshareApi(data).then(() => {
					this.notification = data['title'] + " shared!"
				})
			} else {
				browser.shareByClipboard(data)
				this.notification = data['title'] + " URL copied to the clipboard!"
			}

			setTimeout(() => {
				this.notification = null;
			}, NOTIFICATION_TIMEOUT);
		},

		render() {
			// Disable callback
			browser.bottomCheck({ callback: null })

			this.wikiRequestOngoing += ARTICLE_TO_RENDER;

			for (var i = 0; i < ARTICLE_TO_RENDER; i++) {
				this.wiki.getArticleNext({ isThumbnailNeeded: this.isThumbnailNeeded })
					.then(result => {
						console.log(result)

						this.articles.push(result)

						this.wikiRequestOngoing -= 1;
					})
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
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
	{
	margin-top: -5rem;
}
</style>