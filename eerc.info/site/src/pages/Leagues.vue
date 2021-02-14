<template>
  <q-page class="column">
    <div class="row">
      <div class="q-pa-md col-12">
        <q-card class="self-stretch transparent" flat>
          <q-card-section class="bg-primary rounded-top-border">
            <p class="q-ma-none text-h4">Leagues</p>
          </q-card-section>
          <q-card-section class="row wrap items-stretch">
            <!-- League items here -->
            <league-item v-for="league in leagues" :key="league.id" :league="league" class="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1"/>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeagueItem from 'components/leagues/LeagueItem.vue'
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
