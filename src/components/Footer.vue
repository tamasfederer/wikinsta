<template>
	<div class="footer">
		<IconImage class="icon" :class="{ active: isImage }" @click="changeImage"/>
		<IconLightbulb class="icon" @click="changeTheme"/>
		<IconLanguage class="icon" />
		<IconTrash class="icon" @click="reset"/>
	</div>
</template>
<script>
import browser from '@/utils/browser';

import IconLightbulb from '@/components/Icon/IconLightbulb';
import IconLanguage from '@/components/Icon/IconLanguage';
import IconImage from '@/components/Icon/IconImage';
import IconTrash from '@/components/Icon/IconTrash';

export default {
	name: 'Footer',
	components: {
		IconLightbulb,
		IconLanguage,
		IconImage,
		IconTrash,
	},
	data() {
		return {
			isImage: false,
			isDark: false,
		}
	},
	emits: [
		'language',
		'image',
		'theme',
		'reset',
	],
	computed: {
		lang() {
			return browser.getLanguage();
		},
	},
	methods: {
		changeImage() {
			if (this.isImage) {
				this.isImage = false;
			} else {
				this.isImage = true;
			}

			this.$emit('image', this.isImage);
		},
		changeTheme() {
			if (this.isDark) {
				this.isDark = false;
			} else {
				this.isDark = true;
			}

			this.$emit('theme', this.isDark);
		},
		reset() {
			this.$emit('reset');
		}
	}
}
</script>
<style lang="css" scoped>
.footer {
	position: fixed;
	bottom: 0;
	right: calc((100vw - 480px) / 2);

	width: 100vw;
	height: 48px;

	background-color: var(--color-bg-light);

	z-index: 100;

	display: flex;
	flex-direction: row-reverse;
}

.icon {
	width: 32px;
	height: 32px;

	margin-top: 8px;
	margin-right: 8px;
	margin-bottom: 8px;
	margin-left: 8px;

	transition: 0.2s;

	fill: var(--color-fg);
}

.active {
	fill: var(--color-fg-active);
}

.icon:hover {
	height: 36px;
	width: 36px;

	margin-top: 6px;
	margin-right: 6px;
	margin-left: 6px;

	transition: 0.2s;
	cursor: pointer;
}

.icon:active {
	height: 34px;
	width: 34px;

	margin-top: 7px;
	margin-right: 7px;
	margin-left: 7px;

	transition: 0.1s;
}

@media only screen and (orientation: landscape) {
	.footer {
		top: 0;
		right: 0;

		width: auto;

		background-color: transparent;
	}
}

@media only screen and (orientation: portrait) and (max-width: 480px) {
	.footer {
		right: 0;
	}
}
</style>