<template>
  <q-card>
    <div class="bg-primary row no-wrap justify-end">
      <q-carousel
        v-model="seasonTab"
        class="col q-ma-none text-center bg-primary rounded-top-border"
        arrows animated swipeable height="4rem"
      >
        <q-carousel-slide v-for="season in seasons" :name="season.id" :key="season.id">
          <p class="q-ma-none text-h5 text-uppercase">{{ season.id }}</p>
        </q-carousel-slide>
      </q-carousel>
      <q-btn icon="mdi-plus-box" flat>
        <q-tooltip>
          <p class="q-ma-none text-center">Create a new season.</p>
        </q-tooltip>
      </q-btn>
    </div>
    <q-tab-panels v-model="seasonTab" animated>
      <q-tab-panel v-for="season in seasons" :key="season.id" :name="season.id" class="q-pa-none">
        <season :season="season" :leagueId="leagueId"/>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Season from 'components/Leagues/LeaguePage/Seasons/Season'
export default {
  components: { Season },
  props: {
    seasons: {
      type: Array,
      default: () => []
    },
    leagueId: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      seasonTab: ''
    }
  },
  mounted () {
    this.seasonTab = this.seasons[this.seasons.length - 1].id
  }
}
</script>

<style>

</style>
