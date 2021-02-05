<template>
	<div class="card">
		<img class="card-figure" :src=thumbnail>
		<div class="card-content">
			<p class="card-text">
				<a class="card-header" :href=url target="_blank">{{title}}</a>
				<span>&nbsp;{{extract}}</span>
			</p>
			<ul class="card-category-list">
				<li class="card-category" v-for="(value, name) in categories" :key="name"><a :href=value target="_blank">{{name}}&nbsp;</a></li>
			</ul>
			<div class="card-share">
				<img class="card-share-img" alt="WikInsta" src="@/assets/share.png" @click="share">
			</div>
		</div>
	</div>
</template>
<script>
import share from '@/utils/share'
import browser from '@/utils/browser'

export default {
	name: 'Article',
	props: {
		article: Object,
	},
	data() {
		return {
			notification: "HELLO",
		}
	},
	computed: {
		title() {
			return this.article['title'];
		},
		extract() {
			return this.article['extract'];
		},
		url() {
			if (browser.isMobile()) {
				return "http://en.m.wikipedia.org/?curid=" + this.article['pageid'];
			} else {
				return "http://en.wikipedia.org/?curid=" + this.article['pageid'];
			}
		},
		categories() {
			const cat = {};

			for (var i = 0; i < this.article['categories'].length; i++) {
				let title = this.article['categories'][i]
				let hashtag = "#" + title.substring(9).toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))).replace(/\s/g, '')

				if (browser.isMobile()) {
					cat[hashtag] = "https://en.m.wikipedia.org/wiki/" + title
				} else {
					cat[hashtag] = "https://en.wikipedia.org/wiki/" + title
				}
			}

			return cat
		},
		thumbnail() {
			if (this.article.thumbnail === null) {
				return require("@/assets/nopic.png");
			}

			return this.article.thumbnail;
		}
	},
	// emits: ['evnt'],
	methods: {
		// Share content
		share() {
			share.shareDataByItems({
				title: 'WikInsta',
				text: 'Strange marriage of the Wikipedia and Instagram',
				url: window.location.origin,
			});


			console.log("emit event")
			this.$emit('evnt')
		},
	}
}
</script>
<style lang="css" scoped>
.card {
	display: flex;
	flex-direction: column;
	padding-bottom: 1.5rem;
}

.card-header {
	font-size: 1rem;
	margin: 0;

	color: rgb(24, 24, 24);

	text-shadow: 0px 0px 1px black;

	text-decoration: none;
}

.card-header:hover {
	color: rgb(64, 64, 192);
}

.card-text {
	padding-bottom: 0.25rem;
}

.card-content {
	padding-left: 0.5rem;
	padding-right: 0.5rem;

	width: 100%;

	z-index: 1;
	position: relative;
}

.card-figure {
	width: 100%;
	height: 100%;
	padding-bottom: 0.5rem;
}

.card-category-list {
	font-size: 0.75rem;
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: inline-block;

	width: calc(100% - 32px);
}

.card-category {
	float: left;

	word-break: break-word;
	padding-bottom: 0.25rem;
}

.card-share {
	width: 32px;
	height: 32px;

	position: absolute;
	bottom: 0;
	right: 0.5rem;
}

@media only screen and (orientation: landscape) {
	.card {
		flex-direction: row;
	}

	.card-figure {
		width: 240px;
	}

	.card-content {
		padding-right: 0.5rem;
	}
}
</style>