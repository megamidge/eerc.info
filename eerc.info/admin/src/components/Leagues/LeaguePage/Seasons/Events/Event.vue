<template>
  <q-expansion-item class="bg-grey-10" header-class="bg-primary"
          group="event-group">
      <template v-slot:header>
          <q-item-section avatar>
            <q-icon :name="`img:/icons/flag/${event.location.country.toLowerCase()}.svg`"/>
          </q-item-section>
          <q-item-section>
            <p class="q-ma-none text-h6">{{event.type === 'rally' ? 'Event': ''}} {{index}}: {{ eventBasicName }} <span class="text-grey-5 text-subtitle1">{{formatDateTime(event.datetime)}}</span></p>
            <p class="q-ma-none text-subtitle1">{{ sessions.length }} {{ sessionsLabel }}</p>
          </q-item-section>
      </template>
      <q-card-actions v-if="hasChanges" class="bg-info row justify-between">
        <p class="q-ma-none text-subtitle1">This event has changes.</p>
        <div class="row no-wrap">
          <q-btn unelevated label="Discard" @click="discardChanges"/>
        </div>
      </q-card-actions>
      <q-card-section>
          <p class="q-ma-none text-subtitle1">Date, Time and Duration</p>
          <div class="row justify-start q-mb-md">
            <div class="q-mr-lg">
              <p class="q-ma-none text-subtitle2">Date & Time</p>
              <editable-date-time :value="event.datetime" @input="changeEventProperty('datetime',$event)"/>
            </div>
            <div class="q-mr-lg">
              <p class="q-ma-none text-subtitle2">Duration (dd:hh:mm)</p>
              <editable-time :value="formatTime(event.duration)" @input="changeEventProperty('duration', parseDuration($event))"/>
            </div>
          </div>
          <p class="q-ma-none text-subtitle1">Location</p>
          <div class="row justify-start">
            <div class="q-mr-lg" v-for="key in Object.keys(event.location)" :key="key">
                <p class="q-ma-none text-subtitle2 text-capitalize">{{key}}</p>
                <template v-if="key === 'country'">
                  <q-select label="Country" :value="event.location[key]" @input="changeEventLocationProperty(key,$event)"
                    popup-content-class="bg-primary" color="secondary" class="text-capitalize" :options="countryCodes"
                  >
                    <template v-slot:prepend>
                      <q-icon :name="`img:/icons/flag/${event.location.country}.svg`"/>
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
                </template>
                <template v-else>
                  <editable-text :value="event.location[key]" @input="changeEventLocationProperty(key,$event)"/>
                </template>
            </div>
          </div>
          <div>
            <p class="q-ma-none text-subtitle2 text-capitalize">Event Type</p>
            <q-select :value="event.type" @input="changeEventProperty('type',$event)" :options="eventTypes"/>
          </div>
            <q-btn label="Delete" class="q-my-md" unelevated icon="mdi-delete" color="negative" @click="showDeleteEventConfirmation = true">
              <q-tooltip>
                Deletes this event.
              </q-tooltip>
            </q-btn>
            <q-dialog v-model="showDeleteEventConfirmation" persistent>
              <q-card class="bg-primary">
                <q-card-section>
                  <p class="q-ma-none text-subtitle1">Delete Event</p>
                </q-card-section>
                <q-card-section>
                  <p class="q-ma-none">
                    You are about to delete event {{ event.id }}.
                    This event has {{ sessions.length }} {{ sessionsLabel }}.
                  </p>
                  <p class="q-ma-none text-secondary text-bold">Are you sure?</p>
                </q-card-section>
                <q-card-actions class="row justify-end">
                  <q-btn unelevated label="Cancel" icon="mdi-cancel" v-close-popup color="secondary"/>
                  <q-btn unelevated flat label="Confirm" icon="mdi-check-circle" @click="deleteEvent" color="secondary"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
      </q-card-section>
      <q-card-section>
          <p class="q-ma-none text-subtitle1">{{ sessionsLabel }}</p>
          <div class="row justify-start items-stretch">
            <div
              class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
              v-for="session in sessions"
              :key="session.id"
            >
              <session
                class="full-height"
                :leagueId="leagueId"
                :seasonId="seasonId"
                :eventId="event.id"
                :session="session"
                :eventType="event.type"
                @delete="deleteSession(session.id)"
              />
            </div>
            <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
              <q-card flat class="bg-dark full-height flex flex-center transparent add-stage" @click="showAddSessionDialog = true">
                <q-btn flat :label="`Add ${sessionsLabel.substring(0,sessionsLabel.length-1)}`"/>
              </q-card>
              <q-dialog v-model="showAddSessionDialog">
                <q-card>
                  <q-card-section>
                    <p class="q-ma-none text-subtitle1">Add {{ sessionsLabelSingular }}</p>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <q-input v-model="newSessionId" :label="`New ${sessionsLabelSingular} ID`" :hint="`Enter an ID for the new ${sessionsLabelSingular}`" :disable="autoNewSessionId" />
                      <q-checkbox v-model="autoNewSessionId" label="Auto ID"/>
                    </div>
                    <p class="text-secondary q-mb-none q-mt-md text-bold">This cannot be changed later.</p>
                  </q-card-section>
                  <q-card-actions class="row justify-end">
                    <q-btn color="secondary" flat label="Cancel" @click="()=>{showAddSessionDialog = false;newSessionId=null}"/>
                    <q-btn color="secondary" unelevated label="Confirm" @click="()=>{showAddSessionDialog = false; addSession()}"/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
      </q-card-section>
  </q-expansion-item>
</template>

<script>
import { date } from 'quasar'
import EditableText from 'components/EditableText'
import Session from 'components/Leagues/LeaguePage/Seasons/Events/Sessions/Session'
import deepEqual from 'deep-equal'
import EditableDateTime from 'components/EditableDateTime'
import EditableTime from 'src/components/EditableTime.vue'
import countryCodes from 'assets/countryCodes.json'
export default {
  components: { EditableText, Session, EditableDateTime, EditableTime },
  data () {
    return {
      countryCodes: countryCodes.codes,
      eventTypes: ['rally', 'rally-cross', 'race'],
      showDeleteEventConfirmation: false,
      deletedSession: null,
      deletedSessionIndex: null,
      showAddSessionDialog: false,
      autoNewSessionId: true,
      privNewSessionId: null
    }
  },
  props: {
    leagueId: {
      type: String,
      default: () => ''
    },
    seasonId: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => 0
    },
    event: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    eventBasicName () {
      if (this.event.location.track)
        return this.event.location.track
      else return `${this.event.location.region}, ${this.formatCountry(this.event.location.country)}`
    },
    newSessionId: {
      get () {
        if (this.autoNewSessionId) {
          const newSessionNumber = ('0' + (this.sessions.length + 1)).slice(-2)
          switch (this.event.type) {
            case 'rally': {
              return `Stage ${newSessionNumber}`
            }
            default: {
              return `Session ${newSessionNumber}`
            }
          }
        } else
          return this.privNewSessionId
      },
      set (value) {
        this.privNewSessionId = value
      }
    },
    sessionsLabel () {
      switch (this.event.type) {
        case 'rally': return 'Stages'
        default: return 'Sessions'
      }
    },
    sessionsLabelSingular () {
      return this.sessionsLabel.substring(0, this.sessionsLabel.length - 1)
    },
    sessions () {
      return this.$store.getters[`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/sessions`]
    },
    hasChanges () {
      const eventGet = this.$store.getters[`${this.leagueId}/${this.seasonId}/event`]
      return !deepEqual(this.event, eventGet ? eventGet(this.event.id) : {}) ||
        !deepEqual(this.sessions, this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/sessions`]) ||
        this.sessions.some(session => {
          return !deepEqual(
            this.$store.getters[`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/${session.id}/results`],
            this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/${session.id}/results`]
          )
        })
    }
  },
  methods: {
    deleteEvent () {
      this.showDeleteEventConfirmation = false
      this.$emit('delete')
    },
    changeEventProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/setEventProperty`, { key, value, id: this.event.id })
    },
    changeEventLocationProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/setEventLocationProperty`, { key, value, id: this.event.id })
    },
    addSession () {
      const newSession = {
        id: this.newSessionId,
        name: 'Stage/Qualifying/Race, etc'
      }
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/createSession`, newSession)
    },
    deleteSession (sessionId) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/deleteSession`, sessionId)
      this.$q.notify({
        position: 'bottom',
        type: 'warning',
        message: `${sessionId} deleted.`,
        timeout: 5000,
        classes: 'text-subtitle1 text-bold',
        actions: [
          { label: 'Undo', icon: 'mdi-undo', handler: () => this.undoSessionDelete(sessionId) }
        ]
      })
    },
    undoSessionDelete (sessionId) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/undoSessionDelete`, sessionId)
    },
    discardChanges () {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/setEvent`, {
        eventId: this.event.id,
        newData: this.$store.getters[`${this.leagueId}/${this.seasonId}/event`](this.event.id)
      })
      this.$store.dispatch(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/reset`, {
        leagueId: this.leagueId,
        seasonId: this.seasonId,
        eventId: this.event.id,
        collection: this.event.type === 'rally' ? 'stages' : 'sessions',
        sync: false
      })
      this.sessions.forEach(session => {
        if (this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/session`](session.id)) {
          this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/setSession`, {
            sessionId: session.id,
            newData: this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/session`](session.id)
          })
          this.$store.dispatch(`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/${session.id}/resetResults`, {
            leagueId: this.leagueId,
            seasonId: this.seasonId,
            eventId: this.event.id,
            sessionId: session.id,
            collection: this.event.type === 'rally' ? 'stages' : 'sessions',
            sync: false
          })
        }
      })
    },
    formatCountry (country) {
      const arr = country.split('-')
      const capitalised = arr.map(item => item.charAt(0).toUpperCase() + item.slice(1))
      return capitalised.join(' ')
    },
    formatDateTime (value) {
      const timestamp = new Date(value.seconds * 1000)
      const ret = date.formatDate(timestamp, 'DD/MM/YYYY HH:mm')
      return ret
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

<style lang="scss" scoped>
.add-stage {
  border-color: var(--q-color-dark);
  border-width: 4px;
  border-style: dotted;
  cursor:pointer;
  &:hover {
    background:var(--q-color-primary) !important;
  }
}

</style>
