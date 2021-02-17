<template>
  <q-page class="q-pa-md column" v-if="league">
      <league-info :league="league" :leagueId="leagueId"/>
  </q-page>
  <q-page class="flex flex-center" v-else>
    <q-spinner size="50vw"/>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import LeagueInfo from 'src/components/Leagues/LeaguePage/LeagueInfo.vue'
export default {
  components: { LeagueInfo },
  data () {
    return {
      leagueImage: '',
      openURL: openURL
    }
  },
  computed: {
    leagueId () {
      return this.$route.params.leagueId
    },
    league () {
      return this.$store.getters['data/league'](this.leagueId)
    }
  },
  created () {
    // fetch the extra information for this league (seasons and events).
    if (!this.league) {
      this.leagueWatcher = this.$watch('league', this.leagueDispatch, { immediate: true })
    } else this.leagueDispatch()
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.leagueId}.png`)
        .getDownloadURL()
        .then(url => {
          this.leagueImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    leagueDispatch () {
      if (this.league) {
        this.$store.dispatch('data/registerLeagueModule', this.league).then(() => {
          // module has been resgister, get it to fetch data
          this.$store.dispatch(`${this.league.id}/fetchLeague`, this.league.id)
        })
      }
    }
  }
}
</script>

<style>

</style>
