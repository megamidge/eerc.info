<template>
  <q-card class="q-ma-none" flat>
    <q-card-actions v-if="hasChanges" class="bg-info row no-wrap justify-between">
        <q-icon name="mdi-information-outline" size="1.4rem" class="q-mr-sm"/>
        <p class="q-ma-none text-subtitle1">You have unsaved changes.</p>
        <q-space/>
        <q-btn label="Discard" unelevated @click="discardChanges" :disable="publishing"/>
        <q-btn label="Publish" color="white" text-color="info" unelevated @click="publishChanges" :loading="publishing"/>
    </q-card-actions>
    <q-card-section>
        <p class="q-ma-none text-subtitle1">Vehicle Class</p>
        <editable-text class="q-mt-none" :value="season.vehicleClass" @input="changeSeasonProperty('vehicleClass', $event)"/>
    </q-card-section>
    <q-card-section class="bg-grey-9">
      <p class="q-mt-none text-subtitle1">Events</p>
      <div class="row">

      <event
        v-for="event in events"
        :key="event.id"
        :leagueId="leagueId"
        :seasonId="season.id"
        :event="event"
        class="col-12"
      />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import EditableText from 'components/EditableText'
import Event from './Events/Event.vue'
import deepEqual from 'deep-equal'
export default {
  components: { EditableText, Event },
  props: {
    leagueId: {
      type: String,
      default: () => ''
    },
    season: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      publishing: false
    }
  },
  computed: {
    hasChanges () {
      return !deepEqual(this.season, this.$store.getters[`${this.leagueId}/season`](this.season.id)) ||
        this.events
          .some(event => {
            return !deepEqual(event, this.$store.getters[`${this.leagueId}/${this.season.id}/event`](event.id)) ||
            !deepEqual(this.$store.getters[`edit_${this.leagueId}/${this.season.id}/${event.id}/sessions`], this.$store.getters[`${this.leagueId}/${this.season.id}/${event.id}/sessions`]) ||
            this.$store.getters[`edit_${this.leagueId}/${this.season.id}/${event.id}/sessions`]
              .some(session => {
                return !deepEqual(
                  this.$store.getters[`edit_${this.leagueId}/${this.season.id}/${event.id}/${session.id}/results`],
                  this.$store.getters[`${this.leagueId}/${this.season.id}/${event.id}/${session.id}/results`]
                )
              })
          })
    },
    events () {
      return this.$store.getters[`edit_${this.leagueId}/${this.season.id}/seasonEvents`]
    }
  },
  methods: {
    changeSeasonProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/setSeasonProperty`, { key, value, id: this.season.id })
    },
    eventChange ({ id, changed }) {
      const index = this.editEventsChanged.findIndex(e => e.id === id)
      if (index < 0) this.editEventsChanged.push({ id: id, changed: changed })
      else this.editEventsChanged[index].changed = changed
    },
    discardChanges () {
      this.$store.commit(`edit_${this.leagueId}/setSeason`, {
        seasonId: this.season.id,
        newData: this.$store.getters[`${this.leagueId}/season`](this.season.id)
      })
      this.$store.dispatch(`edit_${this.leagueId}/${this.season.id}/reset`, {
        leagueId: this.leagueId,
        seasonId: this.season.id,
        sync: false
      })
      this.events.forEach(event => {
        if (this.$store.getters[`${this.leagueId}/${this.season.id}/event`](event.id)) {
          this.$store.commit(`edit_${this.leagueId}/${this.season.id}/setEvent`, {
            eventId: event.id,
            newData: this.$store.getters[`${this.leagueId}/${this.season.id}/event`](event.id)
          })
          this.$store.dispatch(`edit_${this.leagueId}/${this.season.id}/${event.id}/reset`, {
            leagueId: this.leagueId,
            seasonId: this.season.id,
            eventId: event.id,
            collection: event.type === 'rally' ? 'stages' : 'sessions',
            sync: false
          })
          this.$store.getters[`edit_${this.leagueId}/${this.season.id}/${event.id}/sessions`].forEach(session => {
            if (this.$store.getters[`${this.leagueId}/${this.season.id}/${event.id}/session`](session.id)) {
              this.$store.commit(`edit_${this.leagueId}/${this.season.id}/${event.id}/setSession`, {
                sessionId: session.id,
                newData: this.$store.getters[`${this.leagueId}/${this.season.id}/${event.id}/session`](session.id)
              })
              this.$store.dispatch(`edit_${this.leagueId}/${this.season.id}/${event.id}/${session.id}/resetResults`, {
                leagueId: this.leagueId,
                seasonId: this.season.id,
                eventId: event.id,
                sessionId: session.id,
                collection: event.type === 'rally' ? 'stages' : 'sessions',
                sync: false
              })
            }
          })
        }
      })
    },
    publishChanges () {
      // Dispatch the editLeague object as changes to publish.
      this.publishing = true
      this.$store.dispatch(`edit_${this.leagueId}/${this.season.id}/publishSeasonChanges`, {})
        .then(() => {
          this.$q.notify({
            position: 'top',
            type: 'positive',
            message: 'Your changes have been published.'
          })
        }).catch(error => {
          console.error(error)
          this.$q.notify({
            position: 'top',
            type: 'negative',
            message: 'Oops. Something went wrong.'
          })
        }).finally(() => {
          this.publishing = false
        })
    }
  }
}
</script>

<style>

</style>
