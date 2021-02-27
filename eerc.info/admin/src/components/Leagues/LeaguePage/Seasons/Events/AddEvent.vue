<template>
  <q-card class="full-width">
      <q-card-section>
          <p class="q-ma-none text-subtitle1">Add Event</p>
      </q-card-section>
      <q-card-section>
          <q-select label="Type" v-model="newEvent.type" :options="eventTypes"/>
          <q-input label="Image" v-model="newEvent.image" disable/>
          <q-input label="Country" v-model="newEvent.location.country"/>
          <q-input label="Region" v-model="newEvent.location.region"/>
          <q-input v-if="newEvent.type !== 'rally'" label="Track" v-model="newEvent.location.track"/>
      </q-card-section>
      <q-card-actions class="row justify-end">
          <q-btn icon="mdi-cancel" label="Cancel" unelevated flat color="secondary" v-close-popup/>
          <q-btn icon="mdi-check-circle" label="Confirm" unelevated color="secondary" @click="createEvent"/>
      </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      newEvent: {
        image: 'default.png',
        location: {
          country: '',
          region: '',
          track: ''
        },
        type: this.automaticEventType()
      },
      eventTypes: ['rally', 'rally-cross', 'race-weekend']
    }
  },
  methods: {
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
        }
      }

      if (this.newEvent.type !== 'rally') {
        event.location.track = this.newEvent.location.track
      }

      this.$emit('submit', event)
    }
  }
}
</script>

<style>

</style>
