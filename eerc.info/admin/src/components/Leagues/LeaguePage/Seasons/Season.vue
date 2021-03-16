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
      <q-btn label="Add Event" icon="mdi-plus" class="q-mb-md full-width" unelevated color="primary" @click="showAddEvent = true"/>
      <q-dialog v-model="showAddEvent">
        <add-event @submit="addEvent($event)"/>
      </q-dialog>
      <div class="row">
        <event
          v-for="(event,index) in events"
          :key="event.id"
          :leagueId="leagueId"
          :seasonId="season.id"
          :event="event"
          :index="index+1"
          class="col-12 q-mb-xs"
          @delete="deleteEvent(event.id)"
        />
      </div>
    </q-card-section>
    <q-card-section class="row justify-end">
      <q-btn label="Delete" class="q-my-md" unelevated icon="mdi-delete" color="negative" @click="showDeleteSeasonConfirmation = true">
          <q-tooltip>
            Deletes this season.
          </q-tooltip>
        </q-btn>
        <q-dialog v-model="showDeleteSeasonConfirmation" persistent>
          <q-card class="bg-primary">
            <q-card-section>
              <p class="q-ma-none text-subtitle1">Delete Season</p>
            </q-card-section>
            <q-card-section>
              <p class="q-ma-none">
                You are about to delete season {{ season.id }}.
                This season has {{ events.length }} events.
              </p>
              <p class="q-ma-none text-secondary text-bold">Are you sure?</p>
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn unelevated label="Cancel" icon="mdi-cancel" v-close-popup color="secondary"/>
              <q-btn unelevated flat label="Confirm" icon="mdi-check-circle" @click="deleteSeason" color="secondary"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-card-section>
  </q-card>
</template>

<script>
import EditableText from 'components/EditableText'
import Event from './Events/Event.vue'
import deepEqual from 'deep-equal'
import AddEvent from './Events/AddEvent.vue'
export default {
  components: { EditableText, Event, AddEvent },
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
      publishing: false,
      showAddEvent: false,
      showDeleteSeasonConfirmation: false
    }
  },
  computed: {
    hasChanges () {
      const seasonGetter = this.$store.getters[`${this.leagueId}/season`]
      return !deepEqual(this.season, seasonGetter ? seasonGetter(this.season.id) : {}) ||
        !deepEqual(this.events, this.$store.getters[`${this.leagueId}/${this.season.id}/seasonEvents`]) ||
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
    deleteSeason () {
      this.showDeleteEventConfirmation = false
      this.$emit('delete')
    },
    deleteEvent (eventId) {
      this.$store.commit(`edit_${this.leagueId}/${this.season.id}/deleteEvent`, eventId)
      this.$q.notify({
        position: 'bottom',
        type: 'warning',
        message: `Event ${eventId} deleted.`,
        timeout: 5000,
        classes: 'text-subtitle1 text-bold',
        icon: 'mdi-delete',
        actions: [
          { label: 'Undo', icon: 'mdi-undo', handler: () => this.undoEventDelete(eventId) }
        ]
      })
    },
    undoEventDelete (eventId) {
      this.$store.commit(`edit_${this.leagueId}/${this.season.id}/undoEventDelete`, eventId)
    },
    addEvent (event) {
      this.showAddEvent = false
      this.$store.commit(`edit_${this.leagueId}/${this.season.id}/createEvent`,
        {
          newEvent: event,
          leagueId: this.leagueId,
          seasonId: this.season.id
        }
      )
    },
    changeSeasonProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/setSeasonProperty`, { key, value, id: this.season.id })
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
      this.publishing = true
      this.$store.dispatch(`edit_${this.leagueId}/${this.season.id}/publishSeasonChanges`, {
        leagueId: this.leagueId,
        seasonId: this.season.id
      })
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
