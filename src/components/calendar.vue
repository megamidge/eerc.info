<template>
	<div class="calendar">
		<div class="calendar-header">
			<chevron-left :size="32" class="nav-icon" style="cursor:pointer;" @click="subtractMonth"></chevron-left>
			<h4>{{month + ' - ' + year}}</h4>
			<chevon-right :size="32" class="nav-icon" style="cursor:pointer;" @click="addMonth"></chevon-right>
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
						:style="{background:(dateContainsEvent(eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date-1))}`)),event)) ? (event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)) :(event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)), borderColor:leagueColour(event.league),color:event.league==='DIRT'?leagueColour(event.league) : 'rgb(var(--accent-dark))'}"
						:class="[{'event-before':dateContainsEvent(eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date-1))}`)),event)},{'event-after':lastMonthDay(date)==daysInLastMonth ? dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(1)}`)),event) :dateContainsEvent(eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date+1))}`)),event)}]"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div
								class="event-info"
								:style="{visibility:(lastMonthDay(date)==daysInLastMonth ? dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(1)}`)),event):dateContainsEvent(eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date+1))}`)),event)) ? 'hidden' : 'visible'}"
							>{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
							<div
								class="event-finish-time"
								:style="{visibility:(lastMonthDay(date)==daysInLastMonth ? dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(1)}`)),event):dateContainsEvent(eventsOnDate(new Date(`${year}-${lastMonthInt}-${dayInt(lastMonthDay(date+1))}`)),event)) ? 'hidden' : 'visible'}"
							>- {{getTime(finishTime(event.event))}}</div>
						</div>
						<div class="spanner"></div>
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
						:style="{background:(date == 1 ? dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt-1}-${dayInt(daysInLastMonth)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date-1)}`)),event)) ? (event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)) : (event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)), borderColor:leagueColour(event.league),color:event.league==='DIRT'?leagueColour(event.league) : 'rgb(var(--accent-dark))'}"
						:class="[{'event-before':date == 1 ? dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt-1}-${dayInt(daysInLastMonth)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date-1)}`)),event)},{'event-after':date==daysInMonth?dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(1)}`)),event) :dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date+1)}`)),event)}]"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div
								class="event-info"
								:style="{visibility:(date==daysInMonth ? dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(1)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date+1)}`)),event)) ? 'hidden' : 'visible'}"
							>{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
							<div
								class="event-finish-time"
								:style="{visibility:(date==daysInMonth ? dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(1)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${monthInt}-${dayInt(date+1)}`)),event)) ? 'hidden' : 'visible'}"
							>- {{getTime(finishTime(event.event))}}</div>
						</div>
						<div
							class="gapfill"
							:style="{background:event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)}"
						></div>
						<div class="spanner"></div>
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
						:style="{background:(date+1 == 1 ? dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt-1}-${dayInt(daysInMonth)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date)}`)),event)) ? (event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)) : (event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)), borderColor:leagueColour(event.league),color:event.league==='DIRT'?leagueColour(event.league) : 'rgb(var(--accent-dark))'}"
						:class="[{'event-before':date+1 == 1 ? dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt-1}-${dayInt(daysInMonth)}`)),event) : dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date)}`)),event)},{'event-after':dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date+2)}`)),event)}]"
						@click="$router.push(`/league/${event.league}`)"
					>
						<div class="info-row">
							{{event.league}}
							<div
								class="event-info"
								:style="{visibility:dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date+2)}`)),event) ? 'hidden' : 'visible'}"
							>{{event.event.track || event.event.location}}</div>
						</div>
						<div class="info-row">
							<div class="event-time">{{getTime(event.event.utcDateTime)}}</div>
							<div
								class="event-finish-time"
								:style="{visibility:dateContainsEvent(eventsOnDate(new Date(`${year}-${nextMonthInt}-${dayInt(date+2)}`)),event) ? 'hidden' : 'visible'}"
							>- {{getTime(finishTime(event.event))}}</div>
						</div>
						<div
							class="gapfill"
							:style="{background:event.league == 'DIRT' ? '#00000000' : leagueColour(event.league)}"
						></div>
						<div class="spanner"></div>
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
import Ajax from '@/ajax.js'
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
			dates: [],
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
	mounted() {
		if (this.calendar.length < 1)
			Ajax.request('/data/calendar.json')
				.as('json')
				.then((response) => {
					this.$store.commit('setCalendar', response.calendar)
					this.createDates()
				})
				.catch((error) => {
					console.log(error)
				})
		else this.createDates()
	},
	methods: {
		createDates() {
			this.calendar.forEach((l) => {
				l.seasons.forEach((s) => {
					s.events.forEach((e) => {
						let d = new Date(e.utcDateTime)
						this.addEventForDate({ league: l.series, event: e }, d)
						let duration = e.duration
						let d2 = new Date(d)
						do {
							let sub = Math.min(1440, duration)
							d2.setMinutes(d2.getMinutes() + sub)
							duration -= sub
							if (d2.getDate() > d.getDate() || d2.getMonth() > d.getMonth() || d2.getYear() > d.getYear()) {
								this.addEventForDate({ league: l.series, event: e }, d2)
							}
						} while (duration > 0)
					})
				})
			})
		},
		addEventForDate(event, date) {
			let dStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			if (this.dates.some((da) => da.date === dStr)) {
				this.dates.find((da) => da.date === dStr).events.push(event)
			} else {
				this.dates.push({
					date: dStr,
					events: [event],
				})
			}
			this.dates.sort((a, b) => {
				var dateA = a.date
				var dateB = b.date
				if (dateA < dateB) return -1
				if (dateA > dateB) return 1
				return 0
			})
		},
		eventsOnDate(date) {
			let dStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			let ret = this.dates.find((d) => d.date == dStr)
			if (!ret) return []
			return ret.events
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
		dateContainsEvent(events, event) {
			let found = false
			events.forEach((e) => {
				let strE = JSON.stringify(e)
				let strEvent = JSON.stringify(event)
				if (strE == strEvent) found = true
			})
			return found
		},
		finishTime(event) {
			let d = new Date(event.utcDateTime)
			d.setMinutes(d.getMinutes() + event.duration)
			return d
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
	user-select: none;
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
	background: rgb(var(--accent-dark));
	width: 100%;
	position: relative;
}
.dates .current-day {
	background: var(--highlight);
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

.dates li.blank {
	/* opacity: 0.5; */
	background: rgba(var(--accent-dark), 0.5);
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
	color: rgb(var(--accent-dark));
	font-weight: bold;
	order: 2;
}
.event.event-before {
	order: 1;
}
.event {
	position: relative;
}
.event .spanner {
	border-radius: 0.2rem;
	position: absolute;
	top: 0;
	bottom: 0;
}
.event.event-before .gapfill {
	right: 100%;
	left: -1rem;
	top: 0;
	bottom: 0;
	position: absolute;
}
.event.event-before .spanner {
	border-right: solid;
	border-top: solid;
	border-bottom: solid;
	border-color: inherit;
	left: -1rem;
	right: -0.1rem;
	border-radius: 0 0.2rem 0.2rem 0;
}
.event.event-after .spanner {
	border-left: solid;
	border-top: solid;
	border-bottom: solid;
	border-color: inherit;
	right: -1rem;
	left: -0.1rem;
	border-radius: 0.2rem 0 0 0.2rem;
}
.event.event-before.event-after .spanner {
	border-top: solid;
	border-bottom: solid;
	border-left: none;
	border-right: none;
	border-color: inherit;
	left: -1rem;
	border-radius: 0;
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
	text-align: left;
	flex-grow: 1;
	font-weight: normal;
}
.event .info-row .event-finish-time {
	display: block;
	text-align: right;
	flex-grow: 1;
	font-weight: normal;
}
.event:hover {
	background: var(--accent-bright-alt);
	/* transform: translateY(1px); */
}
.event.event-before .info-row {
	visibility: hidden;
}
ul {
	list-style: none;
	padding: 0;
}
@media screen and (max-width: 800px) {
	.event .info-row .event-info {
		display: none;
	}
}
@media screen and (max-width: 600px) {
	.event .info-row .event-finish-time {
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
