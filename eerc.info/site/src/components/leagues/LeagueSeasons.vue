<template>
<q-card class="q-ma-md q-pa-none">
    <q-card-section class="q-pa-none">
        <q-carousel
            v-model="seasonTab"
            arrows
            animated
            swipeable
            height="4rem"
            class="q-ma-none text-center bg-accent rounded-top-border"
        >
          <q-carousel-slide v-for="season in seasons" :key="season.id" :name="season.id">
              <p class="q-ma-none text-h5 text-uppercase">{{ season.id }}</p>
          </q-carousel-slide>
        </q-carousel>
        <q-tab-panels
            v-model="seasonTab"
            animated
        >
          <q-tab-panel v-for="season in seasons" :key="season.id" :name="season.id" class="q-py-none q-px-none">
              <league-season :season="season" :leagueId="leagueId"/>
          </q-tab-panel>
        </q-tab-panels>
    </q-card-section>
</q-card>
</template>

<script>
import LeagueSeason from './LeagueSeason.vue'
export default {
  components: { LeagueSeason },
  props: {
    leagueId: {
      type: String,
      default: () => ''
    },
    seasons: {
      type: Array,
      default: () => []
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
