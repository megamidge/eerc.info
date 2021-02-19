<template>
  <q-expansion-item class="bg-grey-10" header-class="bg-primary">
      <template v-slot:header>
          <q-item-section>
            <p class="q-ma-none text-h6">{{event.type === 'rally' ? 'Event': ''}} {{event.id}}</p>
            <p class="q-ma-none text-subtitle1">{{ sessions.length }} {{ sessionsLabel }}</p>
          </q-item-section>
      </template>
      <q-card-section>
          <p class="q-ma-none text-subtitle1">Location</p>
          <div class="row justify-start">
            <div class="q-mr-lg" v-for="[key, value] in Object.entries(event.location)" :key="key">
                <p class="q-ma-none text-subtitle2 text-capitalize">{{key}}</p>
                <editable-text :value="value"/>
            </div>
          </div>
      </q-card-section>
      <q-card-section>
          Sessions
          {{sessions}}
      </q-card-section>
  </q-expansion-item>
</template>

<script>
import EditableText from 'src/components/EditableText.vue'
export default {
  components: { EditableText },
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
      return this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/sessions`]
    }
  }
}
</script>

<style>

</style>
