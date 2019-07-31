<template>
	<div class="body">
		<div class="panel seasons">
			<series-countdown v-if="series.seasons" :series="series"></series-countdown>
			<h1>Seasons:</h1>
			<hr />
			<div class="season" v-for="(season,index) in seasons" :key="index" style>
				<div
					style="display:flex;flex-direction:row;justify-content:space-between;cursor:pointer;"
					@click="seasonClick(index)"
				>
					<h4>{{season.seasonName}}</h4>
					<p v-if="index===showingIndex">&#8593;</p>
					<p v-else>&#8595;</p>
				</div>
				<hr style="width:100%" />
				<div v-if="index === showingIndex" class="season-item">
					<div class="event" v-for="(event,eventIndex) in season.events" :key="eventIndex">
						<div style="display:flex;flex-direction:row;justify-content:flex-start;">
							<div style="display:flex;flex-direction:column;">
								<h4>Round {{eventIndex+1}}</h4>
								<h3>{{event.track}}</h3>
								<h4>{{event.location}}</h4>
								<p>
									<small>{{new Date(event.utcDateTime).toLocaleDateString('en-GB',dateOptions)}}</small>
								</p>
								<p>
									<small>{{event.duration}} mins</small>
								</p>
							</div>
						</div>
						<hr style="width:100%" v-if="eventIndex!= season.events.length-1" />
					</div>
				</div>
			</div>
			<div v-if="!seasons || seasons.length < 1">
				<i>No seasons yet.</i>
			</div>
		</div>
		<div class="panel leagueinfo">
			<div class="logo-title">
				<h2 class="centertext">{{league.name}}</h2>
				<div class="logo" :style="logoStyle"></div>
			</div>
			<hr />
			<button @click="gotosite(league.registration)" class="externalLink">
				<h2>Apply to drive</h2>
				<img src="/img/svg/externLink.svg" width="24" height="24" alt="[external link]" />
			</button>
			<h3>Information:</h3>
			<p>{{league.description}}</p>
			<p>
				<b>Game:</b>
				{{league.game}}
			</p>
			<p>
				<b>Seasons:</b>
				{{seasons ? seasons.length : 0}}
			</p>
		</div>
	</div>
</template>

<script>
import Ajax from '@/ajax.js'
import SeriesCountdown from '@/components/series-countdown'
export default {
	components: {
		SeriesCountdown,
	},
	data() {
		return {
			league: {},
			series: {},
			dateOptions: {
				// weekday: "short",
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: 'numeric',
				minute: 'numeric',
				timeZoneName: 'short',
			},
			showingIndex: -1,
		}
	},
	computed: {
		logoStyle() {
			return { backgroundImage: "url('/img/logos/" + this.league.logo + "')" }
		},
		seasons() {
			return this.series.seasons
		},
	},
	beforeMount() {
		this.GetThisLeague()
	},

	watch: {
		$route(to, from) {
			this.league = {}
			this.series = {}
			// this.seasons = []
			this.GetThisLeague()
		},
	},
	methods: {
		GetThisLeague() {
			Ajax.request('/data/leagues.json')
				.as('json')
				.then((response) => {
					let leagues = response.leagues
					this.league = leagues.find((e) => e.code === this.$route.params.leagueCode)
					if (!this.league) this.$router.replace('/league')
					this.GetThisLeagueSeasons()
				})
				.catch((error) => {
					console.log(error)
				})
		},
		GetThisLeagueSeasons() {
			Ajax.request('/data/calendar.json')
				.as('json')
				.then((response) => {
					let calendar = response.calendar
					let seasonsResult = calendar.find((e) => e.series === this.$route.params.leagueCode)
					if (!seasonsResult) {
						this.series = {}
					} else {
						this.series = seasonsResult
						this.showingIndex = this.seasons.length - 1
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		seasonClick(index) {
			if (index != this.showingIndex) this.showingIndex = index
			else this.showingIndex = -1
		},
		gotosite: (site) => {
			window.open(site)
		},
	},
}
</script>

<style scoped>
.body {
	padding: 0;
	margin: 0.4rem;
	/* display: flex; */
	display: grid;
	grid-template-columns: auto 18rem;
	background: rgb(var(--colour-main));
	grid-gap: 0;
}
.panel {
	margin: 0.5rem;
	padding: 0.2rem;
	/* flex-grow: 1; */
	display: flex;
	flex-direction: column;
	align-items: stretch;
	/* width: 100%; */
}
.leagueinfo {
	position: sticky;
	position: -webkit-sticky;
	top: 0.5rem;
	height: calc(100vh - 2rem);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	text-align: left;
	padding: 0.4rem;
}
.centertext {
	text-align: center;
}
.seasons {
	align-items: stretch;
	text-align: left;
}
.season {
	/* padding: 0.8rem; */
	background: rgb(var(--accent-dark));
	/* margin-left: 0.5rem;
	margin-right: 0.5rem; */
	padding: 0.4rem;
}
.season-item {
	padding: 0.8rem;
	background: var(--accent-bright-alt);
}
a {
	color: var(--text);
	text-decoration: none;
}
a:visited {
	color: unset;
}
a:hover {
	color: var(--text-hover);
}
.logo {
	height: 15rem;
	margin: 0;
	background: var(--accent-bright);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	background-origin: content-box;
	padding: 1rem;
	align-self: stretch;
}
p {
	margin-top: 0.2rem;
	margin-bottom: 0.2rem;
}
h3,
h4,
h5,
h6 {
	margin-top: 0.4rem;
	margin-bottom: 0.4rem;
}
hr {
	width: 90%;
}
.trackmap {
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	background-origin: content-box;
	padding: 1rem;
	width: 20%;
}
.externalLink {
	background-color: var(--accent-bright-alt);
	padding: 0 0.6rem 0 0.6rem;
	border-radius: 0.2rem;
	outline: none;
	border: none;
	color: var(--text);
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

@media screen and (max-width: 640px) {
	.body {
		grid-template-rows: auto auto;
		grid-template-columns: auto;
	}
	.leagueinfo {
		grid-row: 1;
		height: auto;

		position: static;
		background: var(--accent-bright);
		border-radius: 0.2rem;
	}
	.leagueinfo .logo-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.leagueinfo .logo-title .logo {
		padding: 0.1rem;
		height: 5rem;
		width: 5rem;
	}
	.seasons {
		grid-row: 2;
	}
}
</style>
