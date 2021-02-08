<template>
	<transition name="fade">
		<Notification v-if="notification">{{notification}}</Notification>
	</transition>
	<Header @share="share" :isDark=isDark />
	<div class="container">
		<Introduction />
		<Article @share="share" v-for="(article, index) in articles" :key="index" :article="article" />
	</div>
	<Footer @image="image" @reset="reset" @theme="theme" />
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Introduction from '@/components/Introduction.vue';

import Article from '@/components/Article.vue';
import Notification from '@/components/Notification.vue';

import Wiki from '@/utils/wiki';
import browser from '@/utils/browser';

const ARTICLE_TO_RENDER = 5;
const NOTIFICATION_TIMEOUT = 2000;

export default {
	name: 'App',
	components: {
		Header,
		Footer,
		Introduction,
		Article,
		Notification,
	},
	data() {
		return {
			wiki: null,
			articles: [],

			isThumbnailNeeded: false,

			notification: null,

			isDark: false,
		}
	},
	mounted() {
		// Register Wiki
		this.wiki = new Wiki();

		// Initialize Article pool and get first articles
		this.wiki.getRandomArticles()
			.then(() => {
				this.render();
			})
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
			this.articles = [];

			// Initialize Article pool and get first articles
			this.wiki.getRandomArticles()
				.then(() => {
					this.render();
				})
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
			browser.bottomCheck({ callback: null })

			for (var i = 0; i < ARTICLE_TO_RENDER; i++) {
				this.wiki.getArticleNext({ isThumbnailNeeded: this.isThumbnailNeeded })
					.then(result => {
						this.articles.push(result)

						// Register Bottom check
						browser.bottomCheck({ callback: this.render })
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