<template>
	<div class="card">
		<img class="card-figure" :src=thumbnail>
		<div class="card-content">
			<p class="card-text">
				<a class="card-header" :href=href target="_blank">{{title}}</a>
				<span>&nbsp;{{extract}}</span>
			</p>
			<ul class="card-category-list" v-for="(value, name) in categories" :key="name">
				<li class="card-category"><a :href=value target="_blank">{{name}}&nbsp;</a></li>
			</ul>
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
	padding-left: .5rem;
	padding-right: .5rem;
}

.card-figure {
	width: 100%;
	height: 100%;
	padding-bottom: .5rem;
}

.card-category-list {
	font-size: 0.75rem;
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: inline-block;
}

.card-category {
	float: left;
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