<template>
	<div class="footer">
		<IconImage class="icon" :class="{ active: isThumbnailNeeded }" @click="revokeEvent('changeIsThumbnailNeeded')" />
		<IconLightbulbSolid v-if=isDark class="icon" @click="revokeEvent('changeTheme')" />
		<IconLightbulb v-else class="icon" @click="revokeEvent('changeTheme')" />
		<IconLanguage class="icon" @click="revokeEvent('changeLanguage')" />
		<IconTrash class="icon" @click="revokeEvent('resetPage')" />
	</div>
</template>
<script>
// import browser from '@/utils/browser';

import IconLightbulb from '@/components/Icon/IconLightbulb';
import IconLightbulbSolid from '@/components/Icon/IconLightbulbSolid';
import IconLanguage from '@/components/Icon/IconLanguage';
import IconImage from '@/components/Icon/IconImage';
import IconTrash from '@/components/Icon/IconTrash';

export default {
	name: 'Footer',
	components: {
		IconLightbulb,
		IconLightbulbSolid,
		IconLanguage,
		IconImage,
		IconTrash,
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
	emits: [
		'changeIsThumbnailNeeded',
		'changeTheme',
		'changeLanguage',
		'resetPage',
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

			this.$emit(event, parameter);
		},
	}
}
</script>
<style lang="css" scoped>
.footer {
	position: fixed;
	bottom: 0;
	right: calc((100% - 480px) / 2);

	width: 100vh;
	height: 48px;

	background-color: var(--color-bg);

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
	fill: var(--color-fg-hover);

	transition: 0.2s;
	cursor: pointer;
}

.icon:active {
	fill: var(--color-fg);

	transition: 0.1s;
}

@media only screen and (orientation: landscape) {
	.footer {
		top: 0;
		right: calc((100% - 960px) / 2);

		width: auto;

		background-color: transparent;
	}
}

@media only screen and (orientation: landscape) and (max-width: 960px) {
	.footer {
		right: 0;
	}
}

@media only screen and (orientation: portrait) and (max-width: 480px) {
	.footer {
		right: 0;
	}
}
</style>