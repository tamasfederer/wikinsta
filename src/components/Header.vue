<template>
	<div class="header">
		<img v-if="isDark" class="logo" alt="WikInsta" src="@/assets/logo-dark.png">
		<img v-else class="logo" alt="WikInsta" src="@/assets/logo-light.png">
		<div class="language">{{language}}</div>
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
		language: {
			type: String,
			default: "en",
		}
	},
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

	border-bottom: solid;
	border-bottom-width: 1px;
	border-color: var(--color-fg);

	z-index: 100;
}

.logo {
	width: auto;
	height: auto;

	height: 36px;

	margin-top: 6px;
}

.language {
	background-color: var(--color-fg);
	color: var(--color-bg);

	position: fixed;

	font-size: 0.75rem;
	transform: rotate(-15deg);


	top: 32px;
	padding: 4px 8px;

/*	border: solid;
	border-width: 1px;
	border-color: var(--color-bg);*/
	border-radius: 8px;
	text-transform: uppercase;

	left: calc(50% + 75px);
}
</style>