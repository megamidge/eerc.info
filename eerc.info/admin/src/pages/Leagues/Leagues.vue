<template>
  <q-page class="column q-pa-md">
    <div class="row">
      <h1>Leagues</h1>
      <div class="row justify-start items-stretch">
        <league-item class="col-12" v-for="league in leagues" :key="league.id" :league="league"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeagueItem from 'src/components/Leagues/LeagueItem.vue'
export default {
  components: { LeagueItem },
  computed: {
    leagues () {
      return this.$store.getters['data/leagues']
    }
  }
}
</script>

<style>

</style>
