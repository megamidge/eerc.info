<template>
  <q-page class="column" v-if="league">
      <league-info :league="league" :seasons="leagueSeasons.length"/>
      <league-seasons :seasons="leagueSeasons" :leagueId="league.id" v-if="leagueSeasons.length > 0"/>
  </q-page>
  <q-page v-else class="flex flex-center">
      <q-spinner size="25vw" />
  </q-page>
</template>

<script>
import LeagueInfo from 'components/leagues/LeagueInfo.vue'
import LeagueSeasons from 'components/leagues/LeagueSeasons.vue'
export default {
  meta () {
    return {
      title: this.$route.params.league,
      titleTemplate: title => `${title} | EERC.INFO`,
      meta: {
        description: { name: 'description', content: this.league ? this.league.description : 'League' }
      }
    }
  },
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
