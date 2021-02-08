<template>
	<div class="header">
		<img class="logo" alt="WikInsta" src="@/assets/logo.png" @click="share">
	</div>
</template>
<script>
export default {
	name: 'Header',
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

	background-color: var(--color-bg-light);

	z-index: 100;
}

.logo {
	width: auto;
	height: auto;

	height: 44px;

	margin-top: 2px;

	transition: 0.2s;
}

.logo:hover {
	height: 48px;

	margin-top: 0px;

	transition: 0.2s;
	cursor: pointer;
}

.logo:active {
	height: 46px;

	margin-top: 1px;

	transition: 0.1s;
}
</style>