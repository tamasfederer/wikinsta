<template>
	<div class="card">
		<img class="card-figure" :src=thumbnail>
		<div class="card-content">
			<p class="card-text">
				<a class="card-header" :href=href target="_blank">{{title}}</a>
				<span>&nbsp;{{extract}}</span>
			</p>
			<ul class="card-category-list">
				<li class="card-category" v-for="(value, name) in categories" :key="name"><a :href=value target="_blank">{{name}}&nbsp;</a></li>
			</ul>
			<div class="card-share">
				
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Card',
	data() {
		return {
			title: "",
			extract: "",
			href: "",
			thumbnail: "",
			categories: "",
		}
	},
}
</script>
<style lang="css" scoped>
.card {
	display: flex;
	flex-direction: column;
	padding-bottom: 1.5rem;
}

.card-header {
	font-size: 1rem;
	margin: 0;

	color: rgb(24, 24, 24);

	text-shadow: 0px 0px 1px black;

	text-decoration: none;
}

.card-header:hover {
	color: rgb(64, 64, 192);
}

.card-text {
	padding-bottom: 0.5rem;
}

.card-content {
	padding-left: 0.5rem;
	padding-right: 0.5rem;

	z-index: 1;
	position: relative;
}

.card-figure {
	width: 100%;
	height: 100%;
	padding-bottom: 0.5rem;
}

.card-category-list {
	font-size: 0.75rem;
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: inline-block;

	width: calc(100% - 32px);
}

.card-category {
	float: left;

	word-break: break-word;
}

.card-share {
	background-color: red;
	width: 32px;
	height: 32px;

	position: absolute;
    bottom: 0;
    right: 0;
}

@media only screen and (orientation: landscape) {
	.card {
		flex-direction: row;
	}

	.card-figure {
		max-width: 250px;
		width: 40%;
	}

	.card-content {
		padding-right: 0.5rem;
	}
}
</style>