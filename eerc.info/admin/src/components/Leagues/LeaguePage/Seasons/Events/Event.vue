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
                <editable-text :value="event.location[key]" @input="changeEventProperty(`location.${key}`,$event)"/>
            </div>
          </div>
          <div>
            <p class="q-ma-none text-subtitle2 text-capitalize">Event Type</p>
            <editable-text v-model="event.type"/>
          </div>
      </q-card-section>
      <q-card-section>
          <p class="q-ma-none text-subtitle1">{{sessionsLabel}}</p>
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
              <q-card flat class="bg-dark full-height flex flex-center transparent add-stage" @click="addSession">
                <q-btn flat :label="`Add ${sessionsLabel.substring(0,sessionsLabel.length-1)}`"/>
              </q-card>
            </div>
          </div>
      </q-card-section>
  </q-expansion-item>
</template>

<script>
import EditableText from 'components/EditableText'
import Session from 'components/Leagues/LeaguePage/Seasons/Events/Sessions/Session'
export default {
  components: { EditableText, Session },
  data () {
    return {
      deletedSession: null,
      deletedSessionIndex: null
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
    sessionsLabel () {
      switch (this.event.type) {
        case 'rally': return 'Stages'
        default: return 'Sessions'
      }
    },
    sessions () {
      return this.$store.getters[`edit_${this.leagueId}/${this.seasonId}/${this.event.id}/sessions`]
    },
    hasChanges () {
      return false
    }
  },
  methods: {
    changeEventProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/setEventProperty`, { key, value, id: this.event.id })
    },
    addSession () {
      this.editSessions.push({
        id: `New ${this.sessionsLabel.substring(0, this.sessionsLabel.length - 1)} ${('000' + (Math.random() * 100)).slice(-3)}`,
        name: 'Stage/Qualifying/Race, etc'
      })
    },
    deleteSession (sessionId) {
      // const sessionIndex = this.editSessions.findIndex(s => s.id === sessionId)
      // this.deletedSession = extend(true, {}, this.editSessions[sessionIndex])
      // this.deletedSessionIndex = sessionIndex
      // this.$delete(this.editSessions, sessionIndex)
      // this.$q.notify({
      //   group: 'delete',
      //   position: 'bottom',
      //   type: 'warning',
      //   message: `${sessionId} deleted.`,
      //   timeout: 5000,
      //   classes: 'text-subtitle1 text-bold',
      //   actions: [
      //     { label: 'Undo', icon: 'mdi-undo', handler: this.undoSessionDelete }
      //   ]
      // })
    },
    undoSessionDelete () {
      this.editSessions.splice(this.deletedSessionIndex, 0, this.deletedSession)
    },
    discardChanges () {
      // this.editSessions = this.sessions.map(s => {
      //   return {
      //     id: s.id,
      //     ...s
      //   }
      // })
      // this.editEvent = {
      //   id: this.event.id,
      //   ...extend(true, {}, this.event)
      // }
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
