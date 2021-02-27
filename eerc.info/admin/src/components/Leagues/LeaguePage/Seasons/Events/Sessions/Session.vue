<template>
  <q-card>
      <q-card-section>
          <p class="q-ma-none text-body1">{{ session.id }}</p>
          <editable-text class="q-ma-none text-body2" :value="session.name" @input="changeSessionProperty('name', $event)"/>
      </q-card-section>
      <q-card-section class="row justify-between items-center">
          <p class="q-ma-none">There are {{ results.length }} results.</p>
          <q-btn label="Results" color="primary" @click="showResults = true">
              <q-tooltip>
                  Click to view, edit and add results.
              </q-tooltip>
          </q-btn>
          <q-dialog v-model="showResults" persistent>
              <results :results="results" :session="session" :eventType="eventType" @close="showResults = false" :leagueId="leagueId" :seasonId="seasonId" :eventId="eventId"/>
          </q-dialog>
      </q-card-section>
      <q-card-section>
          // TODO : Add editing for other session details (weather condtions), points map/distribution.
      </q-card-section>
      <q-card-actions v-if="hasChanges" class="bg-info row items-center justify-between">
        <p class="q-ma-none text-subtitle2">This session has changes.</p>
        <q-btn label="Discard" @click="discardChanges">
          <q-tooltip>
            Discard any changes, including any new results.
          </q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-actions class="row justify-end">
        <q-btn label="Delete" icon="mdi-delete" color="negative" unelevated @click="$emit('delete')"/>
      </q-card-actions>
  </q-card>
</template>

<script>
import Results from 'components/Leagues/LeaguePage/Seasons/Events/Sessions/Results'
import EditableText from 'components/EditableText'
import deepEqual from 'deep-equal'
export default {
  components: { EditableText, Results },
  data () {
    return {
      showResults: false
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
    eventId: {
      type: String,
      default: () => ''
    },
    session: {
      type: Object,
      default: () => {}
    },
    eventType: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    results () {
      return this.$store.getters[`edit_${this.leagueId}/${this.seasonId}/${this.eventId}/${this.session.id}/results`] || []
    },
    hasChanges () {
      const seshGet = this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/session`]

      return !deepEqual(this.results, this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/${this.session.id}/results`] || []) ||
      !deepEqual(this.session, seshGet ? seshGet(this.session.id) : {})
    }
  },
  methods: {
    changeSessionProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.eventId}/setSessionProperty`, { key, value, id: this.session.id })
    },
    discardChanges () {
      this.$store.commit(`edit_${this.leagueId}/${this.seasonId}/${this.eventId}/setSession`, {
        sessionId: this.session.id,
        newData: this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/session`](this.session.id)
      })
      this.$store.dispatch(`edit_${this.leagueId}/${this.seasonId}/${this.eventId}/${this.session.id}/resetResults`, {
        leagueId: this.leagueId,
        seasonId: this.seasonId,
        eventId: this.eventId,
        sessionId: this.session.id,
        collection: this.eventType === 'rally' ? 'stages' : 'sessions',
        sync: false
      })
    }
  }
}
</script>

<style>

</style>
