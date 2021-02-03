<template>
	<div class="notification">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Notification',

	data() {
		return {

		}
	}
}
</script>
<style lang="css" scoped>
.notification {
	position: fixed;

	margin-top: -0.5rem;

	left: 50%;
	transform: translate(-50%, 0);

	z-index: 200;

	border-radius: 10px;
	border-width: 0px;
	background-color: var(--color-bg-success);
	color: var(--color-fg-success);
	opacity: 0.85;

	min-width: 250px;
}

.content {
	padding: .5rem;
	padding-top: 1rem;
	font-size: .75rem;

	text-align: center;
	vertical-align: middle;
	opacity: 1;
}
</style>