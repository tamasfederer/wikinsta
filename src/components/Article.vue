<template>
	<div class="article">
		<img class="article-figure" :src=thumbnail :alt=alt>
		<div class="article-content">
			<p class="article-text">
				<a :href=link target="_blank"><b>{{title}}</b></a>
				<span>&nbsp;{{extract}}</span>
			</p>
			<ul class="article-category-list">
				<li class="article-category" v-for="(value, name) in categories" :key="name"><a :href=value target="_blank">{{name}}&nbsp;</a></li>
			</ul>
			<IconShare v-if=isMobile class="article-share" @click="share" />
			<IconCopy v-else class="article-share" @click="share" />
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
		language: {
			type: String,
			default: "en",
		}
	},
	computed: {
		isMobile() {
			if (browser.isMobile()) {
				return true;
			} else {
				return false;
			}
		},
		alt() {
			if (this.article.thumbnail === null) {
				return "Wikinsta";
			} else {
				return this.article['title'];
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
		redirect_link() {
			return this.article['redirect_link'];
		},
		categories() {
			let cat = {};

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
				'url': this.redirect_link,
			}

			this.$emit('share', data);
		},
	}
}
</script>
<style lang="css" scoped>
.article {
	display: flex;
	flex-direction: column;
	padding-bottom: 1.5rem;
}

.article-text {
	padding-bottom: 0.25rem;
}

.article-content {
	padding-left: 0.5rem;
	padding-right: 0.5rem;

	width: calc(100% - 1rem);

	z-index: 1;
	position: relative;
}

.article-figure {
	width: 100%;
	height: 100%;
	padding-bottom: 0.5rem;
}

.article-category-list {
	font-size: 0.75rem;
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: inline-block;

	width: calc(100% - 32px);
}

.article-category {
	float: left;

	word-break: break-word;
	padding-bottom: 0.25rem;
}

.article-share {
	width: 32px;
	max-height: 32px;

	bottom: 0rem;
	right: 0.5rem;

	fill: var(--color-fg);
}

@media (hover: hover) {
	.article-share:hover {
		fill: var(--color-fg-hover);
		transition: 0.2s;
		cursor: pointer;
	}

	.article-share:active {
		fill: var(--color-fg);
		transition: 0.1s;
	}
}

@media only screen and (orientation: landscape) {
	.article {
		flex-direction: row;
	}

	.article-figure {
		min-width: 240px;
		width: 240px;
		padding-left: 0.5rem;
		padding-bottom: 0rem;
	}

	.article-content {
		padding-right: 0.5rem;
	}

	.article-share {
		position: absolute;
	}
}
</style>