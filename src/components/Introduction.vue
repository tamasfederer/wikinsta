<template>
	<div class="introduction">
		<p style="text-align:center;"><i>{{motto}}</i></p>
		<p><b>{{introduction[0]}}</b></p>
		<p>{{introduction[1]}} <a href="https://www.vox.com/2018/6/25/17501224/instagram-facebook-snapchat-time-spent-growth-data" target="_blank">{{introduction[2]}}</a> {{introduction[3]}} {{introduction[4]}} {{introduction[5]}} {{introduction[6]}}</p>
		<p>{{introduction[7]}}</p>
		<p>{{introduction[8]}} <a href="https://donate.wikimedia.org" target="_blank">{{introduction[9]}}</a> {{introduction[10]}} {{introduction[11]}} <a href="https://fontawesome.com/support" target="_blank">{{introduction[12]}}</a> {{introduction[13]}}</p>
		<p><b>{{introduction[14]}}</b></p>
		<div class="message"><p v-if=request style="color: red;">{{request}}</p>{{message[0]}}<br />{{message[1]}} <a href="https://github.com/tamasfederer/wikinsta" target="_blank">{{message[2]}}</a> {{message[3]}} <a href="https://github.com/tamasfederer/wikinsta/issues" target="_blank">{{message[4]}}</a> {{message[5]}}</div>
	</div>
</template>
<script>
import translation from '@/utils/translation';

export default {
	name: 'Introduction',
	props: {
		language: String,
	},
	data() {
		return {
			motto: null,
			introduction: null,
			message: null,
			request: null,
		}
	},
	watch: {
		language() {
			this.getTranslation();
		},
	},
	created() {
		this.getTranslation();
	},
	methods: {
		getTranslation() {
			// Get translation
			this.introduction = translation.getTranslation({
				language: this.language,
				item: "introduction",
			});

			this.motto = translation.getTranslation({
				language: this.language,
				item: "motto",
			});

			this.message = translation.getTranslation({
				language: this.language,
				item: "message",
			});

			this.request = translation.getTranslation({
				language: this.language,
				item: "request",
			});
		},
	},
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