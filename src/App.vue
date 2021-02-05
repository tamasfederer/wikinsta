<template>
	<transition name="fade">
		<Notification v-if="notification">{{notification}}</Notification>
	</transition>
	<div class="header">
		<img class="logo" alt="WikInsta" src="./assets/logo.png" @click="share">
	</div>
	<div class="content" ref="container" @evnt='share'>
		<p class="info" style="color: rgb(24, 24, 24); text-shadow: 0px 0px 1px black;">Hello there!</p>
		<p class="info">Did you know that in June 2018 the US Android users spent more than <a href="https://www.vox.com/2018/6/25/17501224/instagram-facebook-snapchat-time-spent-growth-data">50 minutes</a> per day on Instagram? Can you imagine what could be achieved during that time? One can learn a language or a new skill, or a bunch of information can be consumed and the general knowledge of the individual can be increased! This is extremely important, especially these days when misinformation and false news can be found everywhere!</p>
		<p class="info"><a href="/">Wikinsta</a> has been created to make this easier!</p>
		<p class="info">If you like it, please <a href="https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&country=FR&uselang=en&utm_medium=wmfMedium&utm_source=LaunchPost&utm_campaign=comms">support</a> the guys at Wikimedia. Thanks!</p>
		<p class="info" style="padding-bottom: 2rem;">Feel free to <a href="https://github.com/tamasfederer/wikinsta">contribute</a>, report an <a href="https://github.com/tamasfederer/wikinsta/issues">issue</a>!</p>
		<Article v-for="(article, index) in articles" :key="index" :article="article" />
	</div>
</template>
<script>
import Article from '@/components/Article.vue';
import Notification from '@/components/Notification.vue';

import share from '@/utils/share';
import Wiki from '@/utils/wiki';
import browser from '@/utils/browser';

const ARTICLE_TO_RENDER = 5;

export default {
	name: 'App',
	components: {
		Article,
		Notification,
	},
	data() {
		return {
			wiki: null,
			articles: [],

			isThumbnailNeeded: false,

			notification: null,
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
		// Share content
		share() {
			share.shareDataByItems({
				title: 'WikInsta',
				text: 'Strange marriage of the Wikipedia and Instagram',
				url: window.location.origin,
			});

			this.notification = "Contant pasted to the clipboard!"

			setTimeout(() => {
				this.notification = null;
			}, 2000);
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
.header {
	position: fixed;
	top: 0;

	text-align: center;

	width: 100%;
	height: 50px;

	background-color: white;

	z-index: 100;
}

.logo {
	width: auto;
	height: auto;

	height: 50px;

	transition: 0.2s;
}

.logo:hover {
	height: 54px;

	transition: 0.2s;
	cursor: pointer;
}

.logo:active {
	height: 52px;
	transition: 0.1s;
}

.content {
	padding-top: 75px;
	width: 50%;

	margin: auto;

	text-align: justify;
}

.info {
	padding-left: 0.5rem;
	padding-right: 0.5rem;

	padding-bottom: 0.5rem;
}

@media only screen and (min-width: 480px) {
	.content {
		width: 480px;
	}
}

@media only screen and (max-width: 480px) {
	.content {
		width: 100%;
	}
}

@media only screen and (orientation: landscape) {
	.content {
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