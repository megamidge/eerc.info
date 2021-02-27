<template>
  <q-expansion-item class="bg-grey-10" header-class="bg-primary">
      <template v-slot:header>
          <q-item-section>
            <p class="q-ma-none text-h6">{{event.type === 'rally' ? 'Event': ''}} {{event.id}}</p>
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
          <p class="q-ma-none text-subtitle1">Location</p>
          <div class="row justify-start">
            <div class="q-mr-lg" v-for="key in Object.keys(event.location)" :key="key">
                <p class="q-ma-none text-subtitle2 text-capitalize">{{key}}</p>
                <editable-text :value="event.location[key]" @input="changeEventLocationProperty(key,$event)"/>
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
import EditableText from 'components/EditableText'
import Session from 'components/Leagues/LeaguePage/Seasons/Events/Sessions/Session'
import deepEqual from 'deep-equal'
export default {
  components: { EditableText, Session },
  data () {
    return {
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
    event: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
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
