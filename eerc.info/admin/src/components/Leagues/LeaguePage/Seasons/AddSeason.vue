<template>
<q-card class="full-width">
    <q-card-section>
        <p class="q-ma-none text-subtitle1">Add Season</p>
    </q-card-section>
    <q-card-section>
        <q-input label="ID" v-model="newSeason.id"/>
        <q-input label="Vehicle Class" v-model="newSeason.vehicleClass"/>
    </q-card-section>
      <q-card-actions class="row justify-end">
          <q-btn icon="mdi-cancel" label="Cancel" unelevated flat color="secondary" v-close-popup/>
          <q-btn icon="mdi-check-circle" label="Confirm" unelevated color="secondary" @click="createSeason"/>
      </q-card-actions>
</q-card>
</template>

<script>
export default {
  data () {
    return {
      newSeason: {
        id: '',
        vehicleClass: ''
      }
    }
  },
  methods: {
    createSeason () {
      var season = { ...this.newSeason }
      this.$emit('submit', season)
    }
  }
}
</script>

<style>

</style>
