<template>
<q-card>
    <q-card-section class="row justify-between bg-secondary q-py-sm">
        <div class="row no-wrap items-center">
            <p class="q-ma-none text-subtitle1 text-uppercase">Class:</p>
            <p class="q-ma-none q-ml-sm text-subtitle1 text-bold">{{season.vehicleClass}}</p>
        </div>
    </q-card-section>
    <q-card-section class="bg-primary">
        Perhaps if the season has finished, the overall result can be here.
        For example, show the top 3, and a link to 'view full results'.
        This could either open a page or a dialog (either way, it would be ideal to be able to link directly to it).
        This would show the full season results (names/teams in order of classification, points accrued. Any other info i guess.)

    </q-card-section>
    <q-card-section class="row wrap">
      <season-event v-for="(event,index) in events" :key="event.id" :index="index+1" :event="event" :leagueId="leagueId" :seasonId="season.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"/>
    </q-card-section>
</q-card>
</template>

<script>
import SeasonEvent from './seasons/SeasonEvent.vue'
export default {
  components: { SeasonEvent },
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
  computed: {
    events () {
      return this.$store.getters[`${this.leagueId}/${this.season.id}/seasonEvents`]
    }
  }
}
</script>

<style>

</style>
