<template>
	<div class="card">
		<img class="card-figure" :src=thumbnail>
		<div class="card-content">
			<p class="card-text">
				<a :href=link target="_blank"><b>{{title}}</b></a>
				<span>&nbsp;{{extract}}</span>
			</p>
			<ul class="card-category-list">
				<li class="card-category" v-for="(value, name) in categories" :key="name"><a :href=value target="_blank">{{name}}&nbsp;</a></li>
			</ul>
			<IconShare class="card-share" @click="share" v-if=isMobile />
			<iconCopy class="card-share" @click="share" v-else />
		</div>
	</div>
</template>
<script>
import browser from '@/utils/browser'

import IconShare from '@/components/Icon/IconShare';
import IconCopy from '@/components/Icon/IconCopy';

export default {
	name: 'Article',
	components: {
		IconShare,
		IconCopy,
	},
	props: {
		article: Object,
		isDark: {
			type: Boolean,
			default: false,
		},
		language: String,
	},
	computed: {
		isMobile() {
			if (browser.isMobile()) {
				return true;
			} else {
				return false;
			}
		},
		title() {
			return this.article['title'];
		},
		extract() {
			return this.article['extract'];
		},
		link() {
			return this.article['link'];
		},
		categories() {
			const cat = {};

			for (var i = 0; i < this.article['categories'].length; i++) {
				cat[this.article['categories'][i]['hashtag']] = this.article['categories'][i]['link'];
			}

			return cat
		},
		thumbnail() {
			if (this.article.thumbnail === null) {
				if (this.isDark) {
					return require("@/assets/nopic-dark.png");
				} else {
					return require("@/assets/nopic-light.png");
				}
			}

			return this.article.thumbnail;
		}
	},
	emits: [
		'share'
	],
	methods: {
		// Share content
		share() {
			let data = {
				'title': this.title,
				'text': this.extract,
				'url': this.link,
			}

			this.$emit('share', data);
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

.card-text {
	padding-bottom: 0.25rem;
}

.card-content {
	padding-left: 0.5rem;
	padding-right: 0.5rem;

	width: calc(100% - 1rem);

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

	fill: var(--color-fg);
}

.card-share:hover {
	height: 36px;
	width: 36px;

	margin-bottom: -2px;
	margin-right: -2px;

	transition: 0.2s;
	cursor: pointer;
}

.card-share:active {
	height: 34px;
	width: 34px;

	margin-bottom: -1px;
	margin-right: -1px;

	transition: 0.1s;
}

@media only screen and (orientation: landscape) {
	.card {
		flex-direction: row;
	}

	.card-figure {
		width: 240px;
		padding-left: 0.5rem;
	}

	.card-content {
		padding-right: 0.5rem;
	}
}
</style>