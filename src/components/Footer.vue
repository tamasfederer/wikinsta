<template>
	<div class="footer">
		<div class="left">
			<IconTrash class="icon" @click="revokeEvent('resetPage')" />
			<IconShare v-if=isMobile class="icon" @click="revokeEvent('share')" />
			<IconCopy v-else class="icon" @click="revokeEvent('share')" />
		</div>
		<div class="right">
			<IconImage class="icon" :class="{ active: isThumbnailNeeded }" @click="revokeEvent('changeIsThumbnailNeeded')" />
			<IconLightbulbSolid v-if=isDark class="icon" @click="revokeEvent('changeTheme')" />
			<IconLightbulb v-else class="icon" @click="revokeEvent('changeTheme')" />
			<IconLanguage class="icon" @click="revokeEvent('changeLanguage')" />
		</div>
	</div>
</template>
<script>
import browser from '@/utils/browser';

import IconLightbulb from '@/components/Icon/IconLightbulb';
import IconLightbulbSolid from '@/components/Icon/IconLightbulbSolid';
import IconLanguage from '@/components/Icon/IconLanguage';
import IconImage from '@/components/Icon/IconImage';
import IconTrash from '@/components/Icon/IconTrash';
import IconShare from '@/components/Icon/IconShare';
import IconCopy from '@/components/Icon/IconCopy';

export default {
	name: 'Footer',
	components: {
		IconLightbulb,
		IconLightbulbSolid,
		IconLanguage,
		IconImage,
		IconTrash,
		IconShare,
		IconCopy,
	},
	props: {
		isDark: {
			type: Boolean,
			default: false,
		},
		isThumbnailNeeded: {
			type: Boolean,
			default: false,
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
	},
	emits: [
		'changeIsThumbnailNeeded',
		'changeTheme',
		'changeLanguage',
		'resetPage',
		'share',
	],
	methods: {
		revokeEvent(event) {
			let parameter = null;

			if (event === "changeTheme") {
				parameter = !this.isDark;
			}
			if (event === "changeIsThumbnailNeeded") {
				parameter = !this.isThumbnailNeeded;
			}
			if (event === "share") {
				parameter = {
					'title': 'WikInsta',
					'text': 'Strange marriage of the Wikipedia and Instagram',
					'url': window.location,
				}
			}

			this.$emit(event, parameter);
		},
	}
}
</script>
<style lang="css" scoped>
.footer {
	position: fixed;
	bottom: 0;

	width: 100%;
	height: 48px;

	border-top: solid;
	border-top-width: 1px;
	border-color: var(--color-fg);

	background-color: var(--color-bg);

	z-index: 99;
}

.left,
.right {
	position: fixed;
	bottom: 0;

	height: 48px;

	display: flex;
}

.left {
	left: calc((100% - 480px) / 2);
	flex-direction: row;
}

.right {
	right: calc((100% - 480px) / 2);
	flex-direction: row-reverse;
}

.icon {
	width: 32px;
	height: 32px;

	margin: 8px;

	fill: var(--color-fg);
}

.active {
	fill: var(--color-fg-active);
}

@media (hover: hover) {
	.icon:hover {
		fill: var(--color-fg-hover);
		transition: 0.2s;
		cursor: pointer;
	}

	.icon:active {
		fill: var(--color-fg);
		transition: 0.1s;
	}
}

@media only screen and (orientation: landscape) {
	.footer {
		top: 0;

		border-top: none;

		background-color: transparent;

		z-index: 101;
	}

	.left,
	.right {
		top: 0;
		border-top: none;

		width: auto;

		background-color: transparent;
	}

	.right {
		right: calc((100% - 960px) / 2);
	}

	.left {
		left: calc((100% - 960px) / 2);
	}
}

@media only screen and (orientation: landscape) and (max-width: 960px) {
	.left {
		left: 0;
	}

	.right {
		right: 0;
	}
}

@media only screen and (orientation: portrait) and (max-width: 480px) {
	.left {
		left: 0;
	}

	.right {
		right: 0;
	}
}
</style>