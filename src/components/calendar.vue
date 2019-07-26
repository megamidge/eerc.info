<template>
	<div class="calendar">
		<div class="calendar-header">
			<chevron-left :size="48" class="nav-icon" style="cursor:pointer;" @click="subtractMonth"></chevron-left>
			<h4>{{month + ' - ' + year}}</h4>
			<chevon-right :size="48" class="nav-icon" style="cursor:pointer;" @click="addMonth"></chevon-right>
		</div>
		<!-- <ul class="weekdays"></ul> -->
		<ul class="dates">
			<li class="weekday" v-for="day in days" :key="`day${day}`">{{day}}</li>
			<li
				class="blank"
				:class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}"
				v-for="(blank,date) in firstDayOfMonth"
				:key="`blank${date}`"
			>
				<span class="date">
					<p>{{lastMonthDay(date)}}</p>
					<div
						v-for="(event,index) in eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date))}`))"
						:key="`event${index}`"
						class="event"
						:style="{backgroundColor: leagueColour(event.league)}"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div class="event-info">{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
						</div>
					</div>
				</span>
				&nbsp;
			</li>
			<li
				v-for="date in daysInMonth"
				:key="`date${date}`"
				:class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}"
			>
				<span class="date">
					<p>{{date}}</p>
					<div
						v-for="(event,index) in eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date)}`))"
						:key="`event${index}`"
						class="event"
						:style="{backgroundColor: leagueColour(event.league)}"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div class="event-info">{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
						</div>
					</div>
				</span>
				&nbsp;
			</li>
			<li
				class="blank"
				v-for="(blank,date) in (42-firstDayOfMonth-daysInMonth)"
				:key="`blank2${date}`"
				:class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}"
			>
				<span class="date">
					<p>{{date+1}}</p>
					<div
						v-for="(event,index) in eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date+1)}`))"
						:key="`event${index}`"
						class="event"
						:style="{backgroundColor: leagueColour(event.league)}"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div class="event-info">{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
						</div>
					</div>
				</span>
				&nbsp;
			</li>
			<!-- <li v-for="(blank, index) in firstDayOfMonth" :key="`blank2${index}`">&nbsp;</li> -->
		</ul>
	</div>
</template>

<script>
import moment from 'moment'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft'
import ChevonRight from 'vue-material-design-icons/ChevronRight'
import { mapState, mapGetters } from 'vuex'
export default {
	components: {
		ChevronLeft,
		ChevonRight,
	},
	data() {
		return {
			today: moment(),
			dateContext: moment(),
			days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		}
	},
	computed: {
		...mapState(['calendar']),
		...mapGetters(['leagueColour']),
		year() {
			return this.dateContext.format('Y')
		},
		month() {
			return this.dateContext.format('MMMM')
		},
		monthInt() {
			return this.dateContext.format('MM')
		},
		monthIntNoPadding() {
			return this.dateContext.format('M')
		},
		daysInMonth() {
			return this.dateContext.daysInMonth()
		},
		currentDate() {
			return this.dateContext.get('date') + 1
		},
		firstDayOfMonth() {
			var firstDay = moment(this.dateContext).subtract(this.currentDate - 1, 'days')
			return firstDay.weekday()
		},
		initialDate() {
			return this.today.get('date')
		},
		initialMonth() {
			return this.today.format('MMMM')
		},
		initialYear() {
			return this.today.format('Y')
		},
		nextMonthInt() {
			return ('0' + (Number(this.monthInt) + 1)).slice(-2)
		},
		lastMonthInt() {
			return ('0' + (Number(this.monthInt) - 1)).slice(-2)
		},
		daysInLastMonth() {
			let d = moment(this.dateContext)
			d.subtract(1, 'month')
			return d.daysInMonth()
		},
	},
	methods: {
		eventsOnDate(date) {
			let ret = []
			this.calendar.forEach((l) => {
				l.seasons.forEach((s) => {
					s.events.forEach((e) => {
						let d = new Date(e.utcDateTime)
						d.setHours(1, 0, 0, 0)
						if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
							ret.push({
								league: l.series,
								event: e,
							})
						}
					})
				})
			})
			return ret
		},
		dayInt(date) {
			return ('0' + date).slice(-2)
		},
		addMonth() {
			this.dateContext = moment(this.dateContext).add(1, 'month')
		},
		subtractMonth() {
			this.dateContext = moment(this.dateContext).subtract(1, 'month')
		},
		lastMonthDay(date) {
			return this.daysInLastMonth - this.firstDayOfMonth + 1 + date
		},
		getTime(utcDateString) {
			let date = new Date(utcDateString)
			return `${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}`
		},
		padNumber(number) {
			return ('0' + number).slice(-2)
		},
	},
}
</script>

<style scoped>
.calendar {
	background: rgb(var(--colour-main));
	padding: 0.2rem;
	margin: 1rem;
	/* display: flex; */
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}
.calendar-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left: 2rem;
	margin-right: 2rem;
}
.weekdays {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: 0.4rem;
	margin: 0.2rem;
}
.dates {
	display: grid;
	grid-template-columns: repeat(7, 1fr);

	grid-auto-rows: auto 1fr;
	grid-gap: 0.4rem;
	margin: 0.2rem;
}
.dates li {
	background: var(--accent-dark);
	width: 100%;
	position: relative;
}
.dates .current-day {
	background: var(--accent-bright);
	border-radius: 0.2rem;
}
.dates .weekday {
	background: var(--accent-bright);
	/* padding: 0.4rem; */
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
}
.date {
	padding: 0.1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}
.date p {
	width: 100%;
	text-align: right;
	font-size: 0.8rem;
	margin: 0;
	color: var(--text-hover);
}

.blank {
	opacity: 0.5;
}
.event {
	flex-grow: 1;
	background: var(--accent-bright);
	margin: 0.1rem;
	border-radius: 0.2rem;
	font-size: 0.9rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0.1rem;
	cursor: pointer;
	color: var(--accent-dark);
	font-weight: bold;
}
.event .info-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.event .info-row .event-info {
	display: block;
	text-align: right;
}
.event .info-row .event-time {
	display: block;
	text-align: right;
	flex-grow: 1;
	font-weight: normal;
}
.event:hover {
	background: var(--accent-bright-alt);
	transform: translateY(1px);
}
ul {
	list-style: none;
	padding: 0;
}
.material-design-icon > .material-design-icon__svg {
	height: 2rem;
	width: 2rem;
}
.material-design-icon.nav-icon {
	height: 2rem;
	width: 2rem;
}
.material-design-icon.nav-icon > .material-design-icon__svg {
	height: 2rem;
	width: 2rem;
}
@media screen and (max-width: 800px) {
	.event .info-row .event-info {
		display: none;
	}
}
@media screen and (max-width: 600px) {
	.event .info-row .event-time {
		display: none;
	}
}
@media screen and (max-width: 360px) {
	.dates .weekday {
		font-size: 0.6rem;
		padding: 0.1rem;
	}
	.event {
		font-size: 0.5rem;
	}
}
</style>
