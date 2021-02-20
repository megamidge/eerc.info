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
        <editable-text class="q-mt-none" v-model="editSeason.vehicleClass"/>
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
import deepEqual from 'deep-equal'
import { extend } from 'quasar'
import EditableText from 'components/EditableText'
import Event from './Events/Event.vue'
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
      editSeason: null,
      publishing: false
    }
  },
  computed: {
    hasChanges () {
      return !deepEqual(this.editSeason, this.season)
    },
    events () {
      return this.$store.getters[`${this.leagueId}/${this.season.id}/seasonEvents`]
    }
  },
  watch: {
    season: {
      immediate: true,
      handler () {
        this.editSeason = extend(true, {}, this.season)
      }
    }
  },
  methods: {
    discardChanges () {
      this.editSeason = extend(true, {}, this.season)
    },
    publishChanges () {
      // Dispatch the editLeague object as changes to publish.
      this.publishing = true
      this.$q.notify({
        position: 'top',
        type: 'warning',
        message: 'Error: not implemented yet.'
      })
      this.publishing = false
    //   this.$store.dispatch(`${this.leagueId}/publishChanges`, this.editLeague)
    //     .then(() => {
    //       this.$q.notify({
    //         position: 'top',
    //         type: 'positive',
    //         message: 'Your changes have been published.'
    //       })
    //     }).catch(error => {
    //       console.error(error)
    //       this.$q.notify({
    //         position: 'top',
    //         type: 'negative',
    //         message: 'Oops. Something went wrong.'
    //       })
    //     }).finally(() => {
    //       this.publishing = false
    //     })
    }
  }
}
</script>

<style>

</style>
