<template>
	<div class="introduction">
		<p style="text-align:center;"><i>The strange marriage of Wikipedia and Instagram</i></p>
		<p><b>Hello there,</b></p>
		<p>Did you know that in June 2018 the US Android users spent more than <a href="https://www.vox.com/2018/6/25/17501224/instagram-facebook-snapchat-time-spent-growth-data" target="_blank">50 minutes</a> per day on Instagram? Can you imagine what could be achieved during that time? One can learn a language or a new skill, or a bunch of information can be consumed and the general knowledge of the individual can be increased. This is extremely important, especially these days when misinformation and false news can be found everywhere!</p>
		<p>Wikinsta has been created to make this easier.</p>
		<p>If you like it, please <a href="https://donate.wikimedia.org" target="_blank">support</a> the guys at Wikimedia. Also please <a href="https://fontawesome.com/support" target="_blank">support</a> FontAwesome, as I've got these fancy icons from them.</p>
		<p><b>Thanks!</b></p>
		<div class="message">Wikinsta is under development!<br/>Feel free to <a href="https://github.com/tamasfederer/wikinsta" target="_blank">contribute</a> or <a href="https://github.com/tamasfederer/wikinsta/issues" target="_blank">report</a> an issue / submit your idea!</div>
	</div>
</template>
<script>
export default {
	name: 'Introduction',
}
</script>
<style lang="css" scoped>
.introduction {
	padding-top: 8px;

	padding-left: 0.5rem;
	padding-right: 0.5rem;
}

.introduction p {
	padding-bottom: 0.5rem;
}

.message {
	padding: 16px;

	margin-top: 16px;
	margin-bottom: 16px;

	border-top: solid;
	border-top-width: 1px;

	border-bottom: solid;
	border-bottom-width: 1px;

	border-color: var(--color-fg);
	color: var(--color-fg);
	background-color: var(--color-notification-bg);
} 
</style>