<template>
  <q-page class="column" v-if="league">
      <league-info :league="league" :seasons="leagueSeasons.length"/>
      <league-seasons :seasons="leagueSeasons" v-if="leagueSeasons.length > 0"/>
  </q-page>
  <q-page v-else class="flex flex-center">
      <q-spinner size="25vw" />
  </q-page>
</template>

<script>
import LeagueInfo from 'src/components/leagues/LeagueInfo.vue'
import LeagueSeasons from 'src/components/leagues/LeagueSeasons.vue'
export default {
  components: { LeagueInfo, LeagueSeasons },
  created () {
    // fetch the extra information for this league (seasons and events).
    if (!this.league) { this.leagueWatcher = this.$watch('league', this.leagueDispatch, { immediate: true }) } else this.leagueDispatch()
  },
  computed: {
    league () {
      return this.$store.getters['data/league'](this.$route.params.league)
    },
    leagueSeasons () {
      return this.$store.getters[`${this.league.id}/seasons`] || []
    }
  },
  methods: {
    leagueDispatch () {
      if (this.league) {
        this.$store.dispatch('data/registerLeagueModule', this.league).then(() => {
          // the module should be registered, so we can tell it to do shit.
          this.$store.dispatch(`${this.league.id}/fetchLeague`, this.league.id)
        })
        if (this.leagueWatcher) { this.leagueWatcher() }
      }
    }
  },
  data () {
    return {
      leagueWatcher: null
    }
  }
}
</script>
