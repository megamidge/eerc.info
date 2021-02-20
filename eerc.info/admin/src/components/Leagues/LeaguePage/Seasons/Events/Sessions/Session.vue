<template>
  <q-card>
      <q-card-section>
          <editable-text class="q-ma-none text-body1" v-model="editSession.id"/>
          <editable-text class="q-ma-none text-body2" v-model="editSession.name"/>
      </q-card-section>
      <q-card-section class="row justify-between items-center">
          <p class="q-ma-none">There are {{ results.length}} results.</p>
          <q-btn label="Results" color="primary" @click="showResults = true">
              <q-tooltip>
                  Click to view, edit and add results.
              </q-tooltip>
          </q-btn>
          <q-dialog v-model="showResults" persistent>
              <results :results="editResults" :session="session" :eventType="eventType" @input="editResults = $event" @close="showResults = false"/>
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
import { extend } from 'quasar'
import Results from 'components/Leagues/LeaguePage/Seasons/Events/Sessions/Results'
import EditableText from 'components/EditableText'
import deepEqual from 'deep-equal'
export default {
  components: { EditableText, Results },
  data () {
    return {
      showResults: false,
      editResults: [],
      editSession: {}
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
      return this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/${this.session.id}/results`] || []
    },
    hasChanges () {
      return !deepEqual(this.editResults, this.results) || !deepEqual(this.editSession, this.session)
    }
  },
  methods: {
    discardChanges () {
      this.editSession = extend(true, {}, this.session)
      this.editResults = extend(true, [], this.results)
    }
  },
  watch: {
    results: {
      immediate: true,
      handler () {
        this.editResults = extend(true, [], this.results)
      }
    },
    session: {
      immediate: true,
      handler () {
        this.editSession = extend(true, {}, this.session)
      }
    }
  }
}
</script>

<style>

</style>
