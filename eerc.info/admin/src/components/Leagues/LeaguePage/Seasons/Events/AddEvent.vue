<template>
  <q-card class="full-width">
      <q-card-section>
          <p class="q-ma-none text-subtitle1">Add Event</p>
      </q-card-section>
      <q-card-section>
          <q-select label="Type" v-model="newEvent.type" :options="eventTypes"/>
          <q-input label="Image" v-model="newEvent.image" disable/>
          <q-select label="Country" v-model="newEvent.location.country"
            popup-content-class="bg-primary" color="secondary" class="text-capitalize" :options="countryCodes"
          >
            <template v-slot:prepend>
              <q-icon v-if="newEvent.location.country" :name="`img:/icons/flag/${newEvent.location.country.toLowerCase()}.svg`"/>
              <q-icon v-else name="mdi-earth"/>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section avatar>
                  <q-icon :name="`img:/icons/flag/${scope.opt}.svg`"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-capitalize">{{scope.opt}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input label="Region" v-model="newEvent.location.region"/>
          <q-input v-if="newEvent.type !== 'rally'" label="Track" v-model="newEvent.location.track"/>
          <date-time-input label="Date and Time" v-model="newEvent.datetime"/>
          <q-input label="Duration" hint="format as 'days:hours:minutes'" :value="formatTime(newEvent.duration)" @input="newEvent.duration = parseDuration($event)"/>
      </q-card-section>
      <q-card-actions class="row justify-end">
          <q-btn icon="mdi-cancel" label="Cancel" unelevated flat color="secondary" v-close-popup/>
          <q-btn icon="mdi-check-circle" label="Confirm" unelevated color="secondary" @click="createEvent"/>
      </q-card-actions>
  </q-card>
</template>

<script>
import countryCodes from 'assets/countryCodes.json'
import { date } from 'quasar'
import DateTimeInput from 'components/DateTimeInput.vue'
export default {
  components: { DateTimeInput },
  data () {
    return {
      datetimeFormat: 'YYYY/MM/DD HH:mm',
      countryCodes: countryCodes.codes,
      newEvent: {
        image: 'default.png',
        location: {
          country: '',
          region: '',
          track: ''
        },
        type: this.automaticEventType(),
        duration: 0,
        datetime: { seconds: new Date().getTime() / 1000, nanoseconds: 0 }
      },
      eventTypes: ['rally', 'rally-cross', 'race-weekend']
    }
  },
  methods: {
    dateTimeInput (value) {
      const dateObj = date.extractDate(value, this.datetimeFormat)
      console.log('dti', dateObj)
      this.newEvent.datetime = {
        seconds: dateObj.getTime() / 1000,
        nanoseconds: 0
      }
    },
    // formats datetime value.
    formatValue (value) {
      const timestamp = new Date(value.seconds * 1000)
      const ret = date.formatDate(timestamp, 'DD/MM/YYYY HH:mm')
      return ret
    },
    automaticEventType () {
      if (this.$route.params.leagueId === 'DIRT')
        return 'rally'
      else
        return 'race-weekend'
    },
    createEvent () {
      var event = {
        image: this.newEvent.image,
        type: this.newEvent.type,
        location: {
          country: this.newEvent.location.country,
          region: this.newEvent.location.region
        },
        duration: this.newEvent.duration,
        datetime: this.newEvent.datetime
      }

      if (this.newEvent.type !== 'rally') {
        event.location.track = this.newEvent.location.track
      }

      this.$emit('submit', event)
    },
    formatTime (val, strip = { stripDays: true }) {
      var minutes = Math.floor((val / (1000 * 60)) % 60),
        hours = Math.floor((val / (1000 * 60 * 60)) % 24),
        days = Math.floor((val / (1000 * 60 * 60 * 24)))

      days = (days < 10) ? '0' + days : days
      hours = (hours < 10) ? '0' + hours : hours
      minutes = (minutes < 10) ? '0' + minutes : minutes
      const daysStr = strip.stripDays && days <= 0 ? '' : `${days}:`
      const hoursStr = strip.stripHours ? '' : `${hours}:`
      const minuteStr = strip.stripMinutes ? '' : `${minutes}`
      return daysStr + hoursStr + minuteStr
    },
    parseDuration (value) {
      const split = value.split(':').reverse() // reverse so we can go in order of smallest unit to largest unit (smallest always present, large maybe not)
      var minutes = parseInt(split[0])
      var hours = parseInt(split[1])
      var days = parseInt(split[2])
      var totalMillis = 0
      if (minutes && !isNaN(minutes)) totalMillis += minutes * 60000
      if (hours && !isNaN(hours)) totalMillis += hours * 3600000
      if (days && !isNaN(days)) totalMillis += days * 86400000
      return totalMillis
    }
  }
}
</script>

<style>

</style>
