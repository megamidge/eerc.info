<template>
	<div class="wrapper">
		<h1>Leagues</h1>
		<div class="holder">
			<router-link
				v-for="league in leagues"
				:key="league.code"
				:to="`/league/${league.code}`"
				class="league-item"
			>
				<div class="title">
					<h3>{{league.name}}</h3>
				</div>

				<div class="logo" :style="logoStyle(league)"></div>
				<div class="info">
					<p id="code">{{league.code}}</p>
					<p id="name">{{league.game}}</p>
				</div>
			</router-link>
		</div>
		<calendar></calendar>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Calendar from '@/components/calendar'
export default {
	components: {
		Calendar,
	},
	computed: {
		...mapState(['leagues']),
	},
	methods: {
		logoStyle(league) {
			return { backgroundImage: "url('/img/logos/" + league.logo + "')" }
		},
	},
}
</script>

<style scoped>
a {
	color: unset;
	text-decoration: none;
}
a:visited {
	color: unset;
}
a:hover {
	color: unset;
}

.wrapper h1 {
	background: rgb(var(--colour-main));
	margin: 0.4rem;
	padding: 0.2rem;
}
.holder {
	display: grid;
	/* grid-template-columns: repeat(3, 1fr); */
	grid-gap: 1rem;
	grid-auto-flow: row dense;
	grid-auto-rows: min-content;
	padding: 1rem;
}
.league-item {
	/* width: 15rem; */
	height: 15rem;
	background: rgb(var(--accent-dark));
	padding: 0.2rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	cursor: pointer;
	/* margin: 0.4rem; */
}
.league-item:hover {
	background: rgb(var(--colour-main));
	transform: translateY(1px);
}
.title {
	display: flex;
	height: 4rem;
	justify-content: center;
	align-items: center;
}
.league-item .title h3 {
	margin: 0.1rem;
}
.logo {
	height: 10rem;
	margin: 0;
	background: var(--accent-bright);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	background-origin: content-box;
	padding: 0.4rem;
	align-self: stretch;
}
.info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 0.2rem;
	padding-right: 0.2rem;
}
#id {
	text-align: left;
}
#name {
	text-align: right;
}
@media screen and (min-width: 1401px) {
	.holder {
		grid-template-columns: repeat(5, 1fr);
	}
}
@media screen and (max-width: 1400px) {
	.holder {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (max-width: 1000px) {
	.holder {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (max-width: 800px) {
	.holder {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media screen and (max-width: 460px) {
	.holder {
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
