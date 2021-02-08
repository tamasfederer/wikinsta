<template>
	<div class="header">
		<img v-if="isDark" class="logo" alt="WikInsta" src="@/assets/logo-dark.png" @click="share">
		<img v-else class="logo" alt="WikInsta" src="@/assets/logo-light.png" @click="share">
	</div>
</template>
<script>
export default {
	name: 'Header',
	props: {
		isDark: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'share'
	],
	methods: {
		// Share content
		share() {
			let data = {
				'title': 'WikInsta',
				'text': 'Strange marriage of the Wikipedia and Instagram',
				'url': window.location.origin,
			}

			this.$emit('share', data);
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
	height: 48px;

	background-color: var(--color-bg);

	z-index: 100;
}

.logo {
	width: auto;
	height: auto;

	height: 36px;

	margin-top: 6px;

	transition: 0.2s;
}

.logo:hover {
	height: 40px;

	margin-top: 4px;

	transition: 0.2s;
	cursor: pointer;
}

.logo:active {
	height: 38px;

	margin-top: 5px;

	transition: 0.1s;
}
</style>