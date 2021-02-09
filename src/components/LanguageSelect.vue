<template>
	<div class="overlay">
		<div class="overlay-bg"></div>
		<button>English</button>
		<button>Hungarian</button>
	</div>
</template>
<script>
export default {
	name: 'LanguageSelect',
	data() {
		return {

		}
	}
}
</script>
<style lang="css" scoped>
.overlay {
	position: fixed;

	width: 100%;
	height: 100%;

	top: 0;
	left: 0;

	z-index: 1000;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding-left: 32px;
	padding-right: 32px;
	padding-top: 16px;
	padding-bottom: 16px;
}

.overlay-bg {
	position: fixed;

	width: 100%;
	height: 100%;

	z-index: 1001;

	top: 0;
	left: 0;

	opacity: 0.75;

	background-color: var(--color-fg);
}

button {
	opacity: 1;

	width: 128px;
	height: 50px;

	z-index: 1002;

	margin-bottom: 8px;
	margin-top: 8px;

	background-color: var(--color-bg);
	border-color: var(--color-fg);
	border-width: 2px;

	border-radius: 8px;

	text-transform: uppercase;
}

button:hover {
	background-color: var(--color-fg-active);
}
</style>