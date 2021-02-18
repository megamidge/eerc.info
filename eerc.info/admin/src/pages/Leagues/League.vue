<template>
  <q-page class="q-pa-md column" v-if="league">
      <q-card :class="league.active?'bg-positive': 'bg-negative'" class="q-mb-md">
        <q-card-section class="row no-wrap justify-between items-center">
          <div>
          <p class="q-ma-none text-h6">{{league.active ? 'Active' : 'Inactive' }}</p>
          <p v-if="league.active" class="q-ma-none text-caption">This league is visible on the leagues page.</p>
          <p v-else class="q-ma-none text-caption">This league is hidden from the leagues page. <b>It is still accessible.</b></p>
          </div>
          <q-toggle :value="league.active" @input="toggleActive($event)" size="lg"/>
        </q-card-section>
      </q-card>
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
    toggleActive (val) {
      this.$store.dispatch(`${this.leagueId}/toggleActive`, val)
    },
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
