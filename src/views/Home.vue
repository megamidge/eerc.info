<template>
	<div class="body" ref="body">
		<div class="stream-wrapper" v-show="streaming && streamEnabled">
			<div class="stream">
				<div class="stream-video">
					<div class="stream-video">
						<iframe
							ref="ytstream"
							width="100%"
							height="720"
							src="https://www.youtube.com/embed/live_stream?channel=UC4kk8xdkgP1arwEgD7G4Nlw"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>
				<div class="stream-info">
					<h1 v-if="currentSeries">{{currentSeries.series}} {{currentSeries.game}}</h1>
					<p>Live now.</p>
				</div>
			</div>
			<div class="sticky" ref="sticky">
				<h2 class="scroll">
					Scroll
					<div
						style="border-left:1px solid #fff;
                  border-bottom:1px solid #fff;
                  transform: rotate(-45deg);
                  width:1rem;
                  height:1rem;
                  margin-left:1rem;"
					></div>
				</h2>
			</div>
		</div>
		<div class="main">
			<div class="mainLeft">
				<button @click="gotosite('https://forms.gle/NSewf3JRVPY96oVP8')" class="externalLink">
					<h2>Apply to be a driver in the EERC mouseOne Endurance League (rFactor 2)</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>

				<button @click="gotosite('https://goo.gl/forms/spPDvr4aaUVZMKAk1')" class="externalLink">
					<h2>
						<span style="color:#cc0000">[NEW!]</span>
						Apply to be a GT Series driver. (Assetto Corsa Competizione)
					</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>

				<button @click="gotosite('https://forms.gle/SW8G6r5kKbPaGBZp7')" class="externalLink">
					<h2>Apply to be a driver in the World Rally Championship (DiRT Rally)</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>
				<button @click="gotosite('https://goo.gl/forms/NcFb4z5KcKfn2lWo2')" class="externalLink">
					<h2>Apply to be an MSR driver (Project Cars 2)</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>

				<button @click="gotosite('https://goo.gl/forms/myjKb4lxI3XKYZmm2')" class="externalLink">
					<h2>Apply to be a Formula 1 driver (F1 2019)</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>

				<button @click="gotosite('https://goo.gl/forms/DrkrJIC2Ssjmo5bj2')" class="externalLink">
					<h2>Apply to be a Formula E driver (rFactor 2)</h2>
					<img src="img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
				</button>
			</div>
			<div class="mainRight">
				<series-countdown
					v-for="(series,index) in calendar"
					:key="index"
					:series="series"
					@inProgress="changeInProgress($event)"
				></series-countdown>
			</div>
		</div>
	</div>
</template>

<script>
import SeriesCountdown from '@/components/series-countdown.vue'
import Countdown from '@/components/countdown.vue'
import Ajax from '@/ajax.js'
import Header from '@/components/header.vue'
export default {
	data() {
		return {
			ytstream: null,
			calendar: [],
			streaming: false,
			inProgresses: [],
			currentSeries: null,
			streamEnabled: false,
		}
	},
	components: {
		SeriesCountdown,
	},
	watch: {
		ytstream() {
			this.resizeStream()
		},
		inProgresses(array) {
			if (array.some((e) => e.inProgress === true)) {
				this.streaming = true
				this.$nextTick(() => {
					this.ytstream = this.$refs['ytstream'].clientWidth
				})
				let currentSeriesName = array.filter((e) => e.inProgress === true)[0].series
				this.currentSeries = this.calendar.filter((ser) => ser.series === currentSeriesName)[0]
			} else {
				this.streaming = false
			}
		},
	},
	beforeMount() {
		Ajax.request('/data/calendar.json')
			.as('json')
			.then((response) => {
				this.calendar = response.calendar
			})
			.catch((error) => {
				console.log(error)
			})
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				//this.ytstream = this.$refs["ytstream"].clientWidth;
			})
			window.addEventListener('scroll', () => {
				//console.log(this.$refs["body"].scrollTop);
			})
			this.resizeStream()
		})
	},
	methods: {
		changeInProgress(event) {
			let series = event.series
			let inProgress = event.inProgress
			if (this.inProgresses.some((e) => e.series === series)) {
				this.inProgresses.filter((e) => e.series === series)[0].inProgress = inProgress
			} else {
				this.inProgresses.push({ series: series, inProgress: inProgress })
			}
		},
		gotosite: (site) => {
			window.open(site)
		},
		resizeStream() {
			let width = this.$refs['ytstream'].clientWidth
			let aspectX = 16
			let aspectY = 9

			let wx = width * aspectY
			let height = wx / aspectX
			this.$refs['ytstream'].height = height
		},
	},
}
</script>

<style scoped>
.sticky {
	position: sticky;
	position: -webkit-sticky;
	bottom: 0;
}
.scroll {
	font-weight: bolder;
	display: flex;
	flex-direction: row;
	justify-content: center;
	background: rgb(var(--accent-dark));
	opacity: 0.93;
	margin: 0;
}
.stream-wrapper {
	width: 95%;
	margin: 1rem;
	background-color: rgb(var(--accent-dark));
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: space-around;
}
.stream {
	width: 100%;
	background-color: rgb(var(--accent-dark));
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-around;
}
.stream-video {
	flex-grow: 30;
	background-color: rgb(var(--accent-dark));
	margin-right: 0.2rem;
}
.stream-info {
	flex-grow: 4;
	background-color: rgb(var(--colour-main));
	margin-left: 0.2rem;
}
.body {
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.textHeader {
	width: 33%;
}
a {
	text-decoration: none;
	color: var(--text);
	font-weight: bold;
}
.externalLink {
	background-color: rgb(var(--colour-main));
	padding: 10px;
	border-radius: 0.2rem;
	margin: 1rem;
	outline: none;
	border: none;
	color: var(--text);
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.externalLink .paypal {
	justify-content: center;
	align-items: center;
}
.externalLink:hover {
	background-color: rgb(var(--accent-dark));
}
@media screen and (min-width: 600px) and (max-width: 700px) {
	.externalLink {
		flex-direction: column;
	}
}
@media screen and (max-width: 360px) {
	.externalLink {
		flex-direction: column;
	}
}
.main {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
}
@media screen and (max-width: 600px) {
	.main {
		flex-direction: column;
	}
	.mainLeft {
		order: 2;
	}
	.mainRight {
		order: 1;
	}
}
.mainLeft {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	/* width: 50%; */
}
.mainRight {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	/* width: 50%; */
}
</style>
