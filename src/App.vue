<template>
	<div class="header">
		<img class="logo" alt="WikInsta" src="./assets/logo.png">
	</div>
	<div class="content" ref="container">
		<p style="color: rgb(24, 24, 24); text-shadow: 0px 0px 1px black; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Hello there!</p>
		<p style="padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Did you know that in June 2018 the US Android users spent more than <a href="https://www.vox.com/2018/6/25/17501224/instagram-facebook-snapchat-time-spent-growth-data">50 minutes</a> per day on Instagram? Can you imagine what could be achieved during that time? One can learn a language or a new skill, or a bunch of information can be consumed and the general knowledge of the individual can be increased! This is extremely important, especially these days when misinformation and false news can be found everywhere!</p>
		<p style="padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;"><a href="/">Wikinsta</a> has been created to make this easier!</p>
		<p style="padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">If you like it, please <a href="https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&country=FR&uselang=en&utm_medium=wmfMedium&utm_source=LaunchPost&utm_campaign=comms">support</a> the guys at Wikimedia. Thanks!</p>
		<p style="padding-bottom: 3rem; padding-left: 0.5rem; padding-right: 0.5rem;">Feel free to <a href="https://github.com/tamasfederer/wikinsta">contribute</a>, report an <a href="https://github.com/tamasfederer/wikinsta/issues">issue</a>!</p>
	</div>
</template>
<script>
// Impot some external modules
import axios from 'axios'
import { defineComponent, createApp } from 'vue'
import Card from './components/Card.vue'

export default {
	name: 'App',
	data() {
		return {
			ids: [],

			idCacheLimit: 15,
			idCacheCount: 500,

			cardCacheCount: 10,
			cardIsThumbnailNeeded: false,

			bottomDistance: 500,
			bottomCheckEnabled: true,
		}
	},
	mounted() {
		// Register Bottom check
		this.bottomCheck()

		// Get the IDs and the first pack of cards
		this.getIds({
			count: this.idCacheCount,
			getCards: true,
		})
	},
	methods: {
		bottomCheck() {
			window.onscroll = () => {
				if (this.bottomCheckEnabled === true) {
					let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight > (document.documentElement.offsetHeight - this.bottomDistance)

					if (bottomOfWindow) {
						for (var i = 0; i < this.cardCacheCount; i++) {
							this.getCard({
								cardIsThumbnailNeeded: this.cardIsThumbnailNeeded,
							})
						}
					}
				}
			}
		},

		getIds({ count = 500, getCards = false }) {
			// Check count
			if (Number.isInteger(count) == false) {
				count = 500
			} else if (count > 500) {
				count = 500
			} else if (count < 1) {
				count = 1
			}

			var request = "https://en.wikipedia.org/w/api.php" +
				"?origin=*" +
				"&action=query" +
				"&format=json" +
				"&list=random" +
				"&rnnamespace=0" +
				"&rnlimit=" + count

			axios.get(request)
				.then((response) => {
					// Get result
					var result = response.data['query']['random']

					// Save the ID's
					for (var i = 0; i < result.length; i++) {
						this.ids.push(result[i])
					}

					// If it's needed to get some cards --> Get them
					if (getCards) {
						this.getCards({
							id: this.cardCacheCount
						})
					}

				}, (error) => {
					console.log(error)
				})
		},

		getCard({ cardIsThumbnailNeeded = true }) {
			// If there's no IDs --> quit
			if (this.ids.length == 0) {
				return null
			}

			// Disable bottom checking
			this.bottomCheckEnabled = false

			// Get ID
			var id = this.ids.shift()['id']

			// Construct request
			var request = "https://en.wikipedia.org/w/api.php" +
				"?origin=*" +
				"&action=query" +
				"&format=json" +
				"&prop=extracts|pageimages|categories" +
				"&explaintext" +
				"&exintro" +
				"&exchars=250" +
				"&pithumbsize=500" +
				"&pageids=" + id

			// If ID pool is small --> get new IDs
			if (this.ids.length == this.idCacheLimit) {
				this.getIds({
					count: this.idCacheCount
				})
			}

			// Send the request
			axios.get(request)
				.then((response) => {
					// Get result
					var result = response.data['query']['pages'][id]

					// If thumbnail is needed and there's none --> Check again
					if ((cardIsThumbnailNeeded == true) && (!('thumbnail' in result))) {
						this.getCard({
							cardIsThumbnailNeeded: cardIsThumbnailNeeded,
						})
					} else {
						// Construct article
						var article = {}

						article['title'] = result['title']
						article['extract'] = result['extract']
						if (this.isMobile()) {
							article['href'] = "http://en.m.wikipedia.org/?curid=" + result['pageid']
						} else {
							article['href'] = "http://en.wikipedia.org/?curid=" + result['pageid']
						}

						// Create thumbnail
						if ((cardIsThumbnailNeeded == false) && (!('thumbnail' in result))) {
							article['thumbnail'] = require("./assets/nopic.png")
						} else {
							article['thumbnail'] = result['thumbnail']['source']
						}

						// Create 'hashtags' a.k.a. categories
						article['categories'] = {}
						if ('categories' in result) {
							var catTitle
							var catHashtag

							for (var i = 0; i < result['categories'].length; i++) {
								catTitle = result['categories'][i]['title']
								catHashtag = "#" + catTitle.substring(9).toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))).replace(/\s/g, '')

								if (this.isMobile()) {
									article['categories'][catHashtag] = "https://en.m.wikipedia.org/wiki/" + catTitle
								} else {
									article['categories'][catHashtag] = "https://en.wikipedia.org/wiki/" + catTitle
								}
							}
						}

						// Create Card and inject it to the HTML
						var cardView = defineComponent({
							extends: Card,
							data() {
								return {
									title: article['title'],
									extract: article['extract'],
									href: article['href'],
									thumbnail: article['thumbnail'],
									categories: article['categories'],
								}
							}
						})

						// Inject Card to the HTML
						const div = document.createElement('div');
						this.$refs.container.appendChild(div);
						createApp(cardView).mount(div)

						// Finally enable bottom checking
						this.bottomCheckEnabled = true
					}
				}, (error) => {
					console.log(error)
				})
		},

		getCards({ count = 10 }) {
			// Check count
			if (Number.isInteger(count) == false) {
				count = this.cardCacheCount
			} else if (count > this.cardCacheCount) {
				count = this.cardCacheCount
			} else if (count < 1) {
				count = 1
			}

			// Get 'count' cards
			for (var i = 0; i < count; i++) {
				this.getCard({
					cardIsThumbnailNeeded: this.cardIsThumbnailNeeded,
				})
			}
		},

		isMobile() {
			const toMatch = [
				/Android/i,
				/webOS/i,
				/iPhone/i,
				/iPad/i,
				/iPod/i,
				/BlackBerry/i,
				/Windows Phone/i
			];

			return toMatch.some((toMatchItem) => {
				return navigator.userAgent.match(toMatchItem);
			});
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
	height: 50px;

	background-color: white;
}

.logo {
	width: auto;
	height: auto;

	max-height: 50px;
}

.content {
	padding-top: 75px;
	width: 50%;

	margin: auto;

	text-align: justify;
}

@media only screen and (min-width: 480px) {
	.content {
		width: 480px;
	}
}

@media only screen and (max-width: 480px) {
	.content {
		width: 100%;
	}
}

@media only screen and (orientation: landscape) {
	.content {
		width: 100%;
		max-width: 960px;
	}
}
</style>